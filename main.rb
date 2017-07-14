

# main.rb

require 'sinatra' # подгрузить sinatra
# sinatra имеет модульную структуру
# что позволяет включать лишь необходимое:
# require 'sinatra/base'
# вывести на главной странице приветствие
$LOAD_PATH.unshift(File.dirname(__FILE__) + '/app')
require 'routes'  # маршруты
$LOAD_PATH.unshift(File.dirname(__FILE__) + '/config')
#require 'environments' # настройки конфигурации
#require 'constants'    # константы
