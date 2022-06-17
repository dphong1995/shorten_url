class ShortenedUrlsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @encoded_urls = {}
  end

  test 'encode_valid_urls' do
    50.times do
      url = Faker::Internet.url
      post encode_url, params: { url: }
      response_json = JSON.parse(response.body)
      @encoded_urls[url] = response_json['token']
      assert_response :success
    end

    @encoded_urls.each do |url, shorten_url|
      post decode_url, params: { token: shorten_url }
      decoded_url = response.body
      assert_response :success
      assert decoded_url, url
    end
  end

  test 'encode_invalid_urls' do
    50.times do
      url = Faker::String.random
      post encode_url, params: { url: }
      assert_response :unprocessable_entity

      url = Faker::Internet.domain_name
      post encode_url, params: { url: }
      assert_response :unprocessable_entity

      url = Faker::Internet.email
      post encode_url, params: { url: }
      assert_response :unprocessable_entity
    end
  end
end
