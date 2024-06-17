class Tweet < ApplicationRecord
  has_one_attached :image
  belongs_to :user
  validates :title, presence: true
  validates :html, presence: true
  validates :css, presence: true
  validates :js, presence: true
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :tweet_tag_relations, dependent: :destroy
  has_many :tags, through: :tweet_tag_relations
  has_paper_trail

  after_initialize :set_defaults, unless: :persisted?

  def set_defaults
    self.views_count ||= 0
  end
end

