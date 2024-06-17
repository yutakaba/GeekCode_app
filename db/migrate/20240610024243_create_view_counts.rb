class CreateViewCounts < ActiveRecord::Migration[6.1]
 def change
    create_table :view_counts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :tweet, null: false, foreign_key: true
      t.integer :count, default: 0, null: false

      t.timestamps
    end
  end
end
