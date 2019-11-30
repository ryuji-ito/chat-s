class MessagesController < ApplicationController
  def index
  end

  def new
    @message = User.new
  end

end
