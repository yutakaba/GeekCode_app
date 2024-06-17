class AddForeignKeyToTweets < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :tweets, :users
    add_index :tweets, :user_id
  end
end
