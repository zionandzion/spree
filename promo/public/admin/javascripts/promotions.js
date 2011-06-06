var initProductRuleSourceField = function(){

  $products_source_field = jQuery('.products_rule_products_source_field input');
  $products_source_field.click(function() {
    $rule_container = jQuery(this).parents('.promotion-rule');
    if(this.checked){
      if(this.value == 'manual'){
        $rule_container.find('.products_rule_products').show();
        $rule_container.find('.products_rule_product_group').hide();
      } else {
        $rule_container.find('.products_rule_products').hide();
        $rule_container.find('.products_rule_product_group').show();
      }
    }
  });
  $products_source_field.each(function() {
    $(this).triggerHandler('click');
  });

};

var initProductActions = function(){

  $('.calculator-fields').each(function(){
    var $fields_container = $(this);
    var $type_select = $fields_container.find('.type-select');
    var $settings = $fields_container.find('.settings');
    var $warning = $fields_container.find('.warning');
    var originalType = $type_select.val();

    $warning.hide();
    $type_select.change(function(){
      if( $(this).val() == originalType ){
        $warning.hide();
        $settings.show();
        $settings.find('input').removeAttr('disabled');
      } else {
        $warning.show();
        $settings.hide();
        $settings.find('input').attr('disabled', 'disabled');
      }
    });
  });


  //
  // CreateLineItems Promotion Action
  //
  // Autocomplete product and populate variant select
  $(".promotion_action.create_line_items input[name='add_product_name']").autocomplete("/admin/products.json?authenticity_token=" + $('meta[name=csrf-token]').attr("content"), {
      parse: prep_autocomplete_data,
      formatItem: function(item) {
        return format_autocomplete(item);
      }
    }).result(function(event, data, formatted) {
      if(data){
        // $('#add_product_id').val(data.product.id);
        var url = "/admin/products/" + data.product.permalink + "/variants.json?authenticity_token=" + $('meta[name=csrf-token]').attr("content");
        var $variant_select = $("select[name='add_line_item_variant_id']");
        $variant_select.html('');
        $.getJSON(url, {}, function(variants_data){
          $.each(variants_data, function(){
            $variant_select.append($("<option />").val(this.id).text(this.label));
          });
        });
      }
    }
    );
  // Add line item to list
  $(".promotion_action.create_line_items button.add").click(function(){
    var $container = $(this).parents('.promotion_action');
    var product_name = $container.find("input[name='add_product_name']").val();
    var variant_id = $container.find("select[name='add_line_item_variant_id']").val();
    var variant_name = $container.find("select[name='add_line_item_variant_id'] option:selected").text();
    var quantity = $container.find("input[name='add_quantity']").val();
    if(variant_id){
      // Add to the table
      var newRow = "<tr><td>" + product_name + "</td><td>" + variant_name + "</td><td>" + quantity + "</td></tr>";
      $container.find('table').append(newRow);
      // Add to serialized string in hidden text field
      var $hiddenField = $container.find("input[type='hidden']");
      $hiddenField.val($hiddenField.val() + "," + variant_id + "x" + quantity);
    }
    return false;
  });
  // Remove line item








}

$(document).ready(function() {
  initProductRuleSourceField();
  initProductActions();
});



