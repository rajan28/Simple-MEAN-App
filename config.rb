#require 'compass/import-once/activate'
require "susy"
require "breakpoint"
#require "bootstrap-sass"

environment = :development #Current dev environment
preferred_syntax = :scss #scss vs. sass
http_path = '/'
css_dir = 'public/css'
sass_dir = 'public/scss'
images_dir = 'public/img'
javascripts_dir = 'public/js'
relative_assets = true
line_comments = true #add scss/compass comments to css file
cache_path ='public/scss/temp_cache'
output_style = :compressed #switch to compressed for production

