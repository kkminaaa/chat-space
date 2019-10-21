FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/app/assets/images/Moon.jpg")}
    user
    group
  end
end

