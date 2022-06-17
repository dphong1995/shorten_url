class CreateShortenedUrls < ActiveRecord::Migration[6.1]
  def change
    create_table :shortened_urls do |t|
      t.string :original_url, null: false, index: { unique: true }
      t.string :token, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
