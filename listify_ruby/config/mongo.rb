# frozen_string_literal: true

# config/mongo.rb

require 'mongo'

Mongo::Logger.logger.level = ::Logger::INFO

client = Mongo::Client.new(['127.0.0.1:27017'], database: 'test')

# Now you can use `client` to interact with MongoDB collections

