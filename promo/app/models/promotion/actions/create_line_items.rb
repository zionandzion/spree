class Promotion::Actions::CreateLineItems < PromotionAction

  has_many :promotion_action_line_items, :foreign_key => 'promotion_action_id'

  attr_accessor :line_items_string

  def perform(options = {})

  end

end

