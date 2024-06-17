class ViewCount < ApplicationRecord
    belongs_to :user
    belongs_to :tweet
  
    validates :count, numericality: { less_than_or_equal_to: 3 }
end
  