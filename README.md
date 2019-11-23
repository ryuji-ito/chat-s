# README

## userテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false|
|pass|string|null: false|

### Association
- has_many :chat
- has_many :chat_group, through: :groups_users

## chat_group
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|chat_member|string|null: false|

### Association
- has_many :user, through: :groups_users
- has_many :chat

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :chat_group
- belongs_to :user

## chat
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|chat_time|datetime|null: false|

### Association
- belongs_to :user
- belongs_to :chat_group
