Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  
  resources :tweets do
    resources :likes, only: [:create, :destroy]
    member do
      get :versions
    end
  end
  root 'hello#index' 
end
