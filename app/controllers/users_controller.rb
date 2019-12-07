class UsersController < ApplicationController

  def edit
  end

  # def index
  #   @users = User.search(params[:keyword], current_user.id)
  # end

  # def new
  #   @group = Group.new
  #   @group.users << current_user
  # end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end