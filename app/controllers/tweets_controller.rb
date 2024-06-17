class TweetsController < ApplicationController
  before_action :authenticate_user!

  def index
    @tweets = Tweet.page(params[:page]).per(3)
  
    if params[:search].present?
      search = params[:search]
      @tweets = @tweets.joins(:user).where("tweets.body LIKE ? OR users.name LIKE ?", "%#{search}%", "%#{search}%")
    end
  
    if params[:tag_ids].present?
      filtered_tweets = []
      params[:tag_ids].each do |key, value|
        if value == "1"
          tag_tweets = Tag.find_by(name: key).tweets
          filtered_tweets = filtered_tweets.empty? ? tag_tweets : filtered_tweets & tag_tweets
        end
      end
      @tweets = Kaminari.paginate_array(filtered_tweets).page(params[:page]).per(3) unless filtered_tweets.empty?
    end
  
    if params[:tag].present?
      Tag.create(name: params[:tag])
    end

    @rank_tweets = case params[:ranking]
    when 'views'
      Tweet.order(views_count: :desc).limit(3)
    when 'weekly_views'
      Tweet.where('created_at >= ?', 1.week.ago).order(views_count: :desc).limit(3)
    when 'monthly_views'
      Tweet.where('created_at >= ?', 1.month.ago).order(views_count: :desc).limit(3)
    when 'weekly_likes'
      Tweet.all.sort { |a, b| b.liked_users.where('likes.created_at >= ?', 1.week.ago).count <=> a.liked_users.where('likes.created_at >= ?', 1.week.ago).count }.first(3)
    when 'monthly_likes'
      Tweet.all.sort { |a, b| b.liked_users.where('likes.created_at >= ?', 1.month.ago).count <=> a.liked_users.where('likes.created_at >= ?', 1.month.ago).count }.first(3)
    else
      Tweet.all.sort { |a, b| b.liked_users.count <=> a.liked_users.count }.first(3)
    end
  end
  
  def new
    @tweet = Tweet.new
  end
  
  def create
    @tweet = current_user.tweets.build(tweet_params)
    if @tweet.save
      redirect_to tweets_path, notice: 'Tweet was successfully created.'
    else
      flash.now[:alert] = 'Failed to create tweet.'
      render :new
    end
  end
  
  def show
    @tweet = Tweet.find(params[:id])
    @tweet.increment!(:views_count)
    track_view_count(@tweet)
  end
  
  def edit
    @tweet = Tweet.find(params[:id])
  end
  
  def update
    @tweet = Tweet.find(params[:id])
    if @tweet.update(tweet_params)
      redirect_to tweet_path(@tweet), notice: 'Tweet was successfully updated.'
    else
      flash.now[:alert] = 'Failed to update tweet.'
      render :edit
    end
  end
  
  def destroy
    @tweet = Tweet.find(params[:id])
    @tweet.destroy
    redirect_to tweets_path, notice: 'Tweet was successfully deleted.'
  end

  private

  def tweet_params
    params.require(:tweet).permit(:title, :html, :css, :js, :image, :url, tag_ids: [])
  end

  def track_view_count(tweet)
    return unless user_signed_in?

    view_count = ViewCount.find_or_create_by(user: current_user, tweet: tweet)
    view_count.increment!(:count) if view_count.count < 3
  end
end
