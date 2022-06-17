class ShortenedUrlController < ApplicationController
  def encode
    shortened_url = ShortenedUrl.generate!(original_url)
    render json: { token: shortened_url.token }
  rescue ActiveRecord::RecordInvalid, URI::InvalidURIError => e
    render json: e, status: :unprocessable_entity
  end

  def decode
    shortened_url = ShortenedUrl.where(token: ShortenedUrl.extract_token!(token)).first!
    render json: shortened_url.original_url
  rescue ActiveRecord::RecordNotFound, URI::InvalidURIError, ShortenedUrl::TokenNotFoundError => e
    render json: e.message, status: :not_found
  end

  private

  def original_url
    params.require(:url)
  end

  def token
    params.require(:token)
  end
end
