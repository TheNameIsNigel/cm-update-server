$(document).ready(function() {
	var filterAreaAttrName = 'data-filter-area-for';
	var filterLinkAttrName = 'data-filter-value';

	var romTable = $('#rom-table');
	var romDataTable = romTable.DataTable({
		'bLengthChange': false,
		'bPaginate': false,
		'bAutoWidth': false,
		'bFilter': true,
		'aaSorting': [ /* The values are pre-sorted on server side. */ ],
		'aoColumnDefs': [
			{
				'bSortable': false,
				'aTargets': [ 'col-filename' ],
			}
		],
		'sDom': 'lrtip', /* Disable the search box */
	});

	$('[' + filterAreaAttrName + ']').each(function(featureAreaIdx, filterAreaElement) {
		var filterArea = $(filterAreaElement);
		var filterColumn = romDataTable.column(filterArea.attr(filterAreaAttrName));
		var filterValueList = filterArea.find('ul');

		filterColumn.data().unique().sort().each(function(filterValue, filterValueIdx) {
			filterValueList.append('<li><a href="#" ' + filterLinkAttrName + '="' + filterValue + '">' + filterValue + '</a></li>');
		});

		filterArea.removeClass('hidden').addClass('show');

		filterValueList.find('a[' + filterLinkAttrName + ']').click(function() {
			var clickedLink = $(this);
			filterColumn.search(clickedLink.attr(filterLinkAttrName)).draw();
			filterValueList.find('.active').removeClass('active');
			clickedLink.parent().addClass('active');
			return false;
		});
	});
});