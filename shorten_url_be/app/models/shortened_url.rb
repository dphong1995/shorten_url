class ShortenedUrl < ApplicationRecord
  class TokenNotFoundError < StandardError
    def message
      'Token not found'
    end
  end

  CHARSETS = (('a'..'z').to_a + ('A'..'Z').to_a + (0..9).to_a).freeze
  MIN_TOKEN_LENGTH = 6
  TOKEN_LENGTH = 6
  MAX_URL_LENGTH = 2048

  validates :original_url,
            presence: true,
            format: URI::DEFAULT_PARSER.make_regexp(%w[http https]),
            uniqueness: true,
            length: { maximum: MAX_URL_LENGTH }

  before_create :generate_token

  class << self
    def generate!(original_url)
      normalized_url = URI.parse(original_url.strip).normalize.to_s
      where(original_url: normalized_url).first_or_create!
    rescue ActiveRecord::RecordNotUnique
      retries ||= 3
      retries -= 1

      raise if retries <= 0

      retry
    end

    def extract_token!(url)
      path = URI.parse(url.strip).path
      path.slice!(0) if path.start_with?('/')

      extracted_token = /^([#{Regexp.escape(CHARSETS.join)}]{#{token_length_regexp}})$/.match(path).to_s
      raise TokenNotFoundError if extracted_token.blank?

      extracted_token
    end

    private

    def token_length_regexp
      [MIN_TOKEN_LENGTH, TOKEN_LENGTH].compact.join(',')
    end
  end

  private

  def generate_uniq_key
    (0...TOKEN_LENGTH).map { CHARSETS[rand(CHARSETS.size)] }.join
  end

  def generate_token
    loop do
      self.token = generate_uniq_key

      break unless self.class.unscoped.exists?(token:)
    end
  end
end
