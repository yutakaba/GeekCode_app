class AddCssAndJsToTweets < ActiveRecord::Migration[6.1]
  def change
    add_column :tweets, :css, :text
    add_column :tweets, :js, :text
  end
end
