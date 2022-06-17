Rails.application.routes.draw do
  post '/encode', to: 'shortened_url#encode'
  post '/decode', to: 'shortened_url#decode'
end
