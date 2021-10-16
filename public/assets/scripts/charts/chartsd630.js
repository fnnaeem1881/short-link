$(document).ready(function () {


    $(document).delegate('.game-item', 'click', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');
        var game_code = $(this).attr('id');

        getGameChartContent(url, game_code);
    });

});


function getGameChartContent(url, game_code)
{
    $('#games').after('<div class="menu-overlay" style="text-align: center;" id="loading"><img style="margin-top: 21px" id="loading_img"/></div>');
    $('#loading_img').attr('src', mtv.assetPath + 'images/loading_big.gif').show();
    $.get( url+'/'+game_code+'.html', function( data ) {
        $('#loading').remove();
        $('#games-stats-container').html( data );

        if (data.indexOf('draw_chart_betpayout') >= 0) {
            draw_chart_betpayout();
        }
        if (data.indexOf('draw_chart_plays') >= 0) {
            draw_chart_plays();
        }
        if (data.indexOf('draw_chart_payoutmax') >= 0) {
            draw_chart_payoutmax();
        }
    });
}