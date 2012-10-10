/**
 * 'Collapsed' means 'Are your children hidden?'
 */
$(function() {

	/**
	 * Get the immediate children of the li / class.
	 *
	 * @param {jQuery.DOMElement} li
	 * @return {array} The children.
	 */
	function getChildren(li) {
		var level = $(li).data('level'),
			index = $('li.class').index(li),
			children = [],
			open = true;

		// cycle through lis again, selecting the ones on the next level down
		$('li.class').each(function(index2) {
			// console.log(open, index, index2, $(this).data('level'), level);
			if (open && index2 >= index && $(this).data('level') == level + 1) {
				children.push(this);
			}
			else if (index2 > index) {
				open = false;
			}
		});
		return children;
	}

	$('li.class').on('collapse', function() {
		var children = getChildren(this);
		for (var i in children) {
			$(children[i]).trigger('collapse');
		}
		if (children.length) $(this).addClass('collapsed');
		$(this).hide();
	});

	$('li.class').on('expand', function() {		
		var children = getChildren(this),
			child;

		for (var i in children) {
			child = $(children[i]);
			child.show();
		}
		$(this).removeClass('collapsed');
		$(this).show();
	});

	$('li.class').on('click', function(ev) {
		ev.preventDefault();
		if ($(this).hasClass('collapsed')) {
			$(this).trigger('expand');
		}
		else {
			$(this).trigger('collapse');
			$(this).show();
		}
	});

	// Set up togglability of class list items.
	//$('li.class').each(function(index, li) {
		// console.log(children);
	//});

	$('li.class').trigger('collapse');
	$('li.class[data-level=0]').show();


});