#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

bundle
rails db:migrate
rails s -b 0.0.0.0 -e development
