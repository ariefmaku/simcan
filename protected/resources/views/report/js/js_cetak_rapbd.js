$(document).ready(function(){

function formatTgl(val_tanggal){
    var formattedDate = new Date(val_tanggal);
    var d = formattedDate.getDate();
    var m = formattedDate.getMonth();
    var y = formattedDate.getFullYear();
    var m_names = new Array("Januari", "Februari", "Maret", 
        "April", "Mei", "Juni", "Juli", "Agustus", "September", 
        "Oktober", "November", "Desember")

    var tgl= d + " " + m_names[m] + " " + y;
    return tgl;
}

function hariIni(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    var hariIni = yyyy + '-' + mm + '-' + dd;
    return hariIni;
}

$('#tgl_laporan_x').val(formatTgl(hariIni()));

$('#tgl_laporan_x').datepicker({
    altField: "#tgl_laporan",
    altFormat: "yy-mm-dd", 
    dateFormat: "dd MM yy",
});

$.ajax({
    type: "GET",
    url: '../admin/parameter/getUrusan',
    dataType: "json",
    success: function(data) {
        var j = data.length;
        var post, i;

        $('select[name="urusan_prarka"]').empty();
        $('select[name="urusan_prarka"]').append('<option value="-1">---Pilih Urusan---</option>');

        for (i = 0; i < j; i++) {
            post = data[i];
            $('select[name="urusan_prarka"]').append('<option value="'+ post.kd_urusan +'">'+ post.nm_urusan +'</option>');

        }
    }
});

$.ajax({
    type: "GET",
    url: './jenis_rapbd',
    dataType: "json",
    success: function(data) {
        var j = data.length;
        var post, i;

        for (i = 0; i < j; i++) {
            post = data[i];
            $('select[name="jns_laporan"]').append('<option value="'+ post.id +'">'+ post.uraian_laporan +'</option>');
        }
    }
});

$.ajax({
    type: "GET",
    url: '../admin/parameter/getTahun',
    dataType: "json",
    success: function(data) {
        var j = data.length;
        var post, i;

        $('select[name="tahun_prarka"]').empty();
        $('select[name="tahun_prarka"]').append('<option value="-1">---Pilih Tahun---</option>');

        for (i = 0; i < j; i++) {
          post = data[i];
          $('select[name="tahun_prarka"]').append('<option value="'+ post.tahun +'">'+ post.tahun +'</option>');
        }
    }
});

$( ".tahun_prarka" ).change(function() {
    $.ajax({
        type: "GET",
        url: './getDokAPBD/'+$('#tahun_prarka').val(),
        dataType: "json",
        success: function(data) {
          var j = data.length;
          var post, i;

          $('select[name="no_dokumen"]').empty();
          $('select[name="no_dokumen"]').append('<option value="-1">---Pilih  Dokumen APBD---</option>');

          for (i = 0; i < j; i++) {
            post = data[i];
            $('select[name="no_dokumen"]').append('<option value="'+ post.id_dokumen_keu +'">'+ post.nomor_keu +" ("+post.uraian_perkada+")"+'</option>');
          }
        }
    });
});

$( ".urusan_prarka" ).change(function() {
    $.ajax({
        type: "GET",
        url: '../admin/parameter/getBidang/'+$('#urusan_prarka').val(),
        dataType: "json",
        success: function(data) {
          var j = data.length;
          var post, i;

          $('select[name="bidang_prarka"]').empty();
          $('select[name="bidang_prarka"]').append('<option value="-1">---Pilih  Bidang---</option>');

          for (i = 0; i < j; i++) {
            post = data[i];
            $('select[name="bidang_prarka"]').append('<option value="'+ post.id_bidang +'">'+ post.nm_bidang +'</option>');
          }
        }
    });
});

$( ".bidang_prarka" ).change(function() {  
    $.ajax({
        type: "GET",
        url: '../admin/parameter/getUnit2/'+$('#bidang_prarka').val(),
        dataType: "json",
        success: function(data) {
          var j = data.length;
          var post, i;

          $('select[name="unit_prarka"]').empty();
          $('select[name="unit_prarka"]').append('<option value="-1">---Pilih Unit---</option>');

          for (i = 0; i < j; i++) {
            post = data[i];
            $('select[name="unit_prarka"]').append('<option value="'+ post.id_unit +'">'+ post.nm_unit +'</option>');
          }
        }
    });
});

$( ".unit_prarka" ).change(function() { 
    $.ajax({
        type: "GET",
        url: 'getProgramAPBD/'+$('#unit_prarka').val()+'/'+$('#tahun_prarka').val(),
        dataType: "json",
        success: function(data) {
          var j = data.length;
          var post, i;

          $('select[name="prog_prarka"]').empty();
          $('select[name="prog_prarka"]').append('<option value="-1">---Pilih Program---</option>');

          for (i = 0; i < j; i++) {
            post = data[i];
            $('select[name="prog_prarka"]').append('<option value="'+ post.id_program_pd +'">'+ post.uraian_program_renstra +'</option>');
          }
        }
    });
    $.ajax({
        type: "GET",
        url: '../admin/parameter/getSub2/'+$('#unit_prarka').val(),
        dataType: "json",

        success: function(data) {
          var j = data.length;
          var post, i;

          $('select[name="sub_prarka2"]').empty();
          $('select[name="sub_prarka2"]').append('<option value="-1">---Pilih Sub Unit---</option>');

          for (i = 0; i < j; i++) {
            post = data[i];
            $('select[name="sub_prarka2"]').append('<option value="'+ post.id_sub_unit +'">'+ post.nm_sub +'</option>');
          }
        }
    });

});

$( ".prog_prarka" ).change(function() {  
    $.ajax({
        type: "GET",
        url: 'getKegiatanAPBD/'+$('#prog_prarka').val(),
        dataType: "json",
        success: function(data) {
          var j = data.length;
          var post, i;

          $('select[name="keg_prarka"]').empty();
          $('select[name="keg_prarka"]').append('<option value="-1">---Pilih Kegiatan---</option>');

          for (i = 0; i < j; i++) {
            post = data[i];
            $('select[name="keg_prarka"]').append('<option value="'+ post.id_kegiatan_pd +'">'+ post.uraian_kegiatan_forum +'</option>');
          }
        }
    });
});


$(document).on('click', '.btnProses', function() {
    if($('#jns_laporan').val()==1){
      vars = "?token="     + $('input[name=_token]').val();
        vars += "&tahun="     + $('#tahun_prarka').val();
        vars += "&id_dokumen="     + $('#no_dokumen').val();
        vars += "&kota="   + $('#nama_kota_lap').val();
        vars += "&tanggal="   + $('#tgl_laporan_x').val(); 
        window.open('../RAPBDLamp1'+ vars, '_blank'); 
    };
    if($('#jns_laporan').val()==2){
      vars = "?token="     + $('input[name=_token]').val();
        vars += "&tahun="     + $('#tahun_prarka').val();
        vars += "&id_dokumen="     + $('#no_dokumen').val();
        vars += "&kota="   + $('#nama_kota_lap').val();
        vars += "&tanggal="   + $('#tgl_laporan_x').val(); 
        window.open('../RAPBDLamp2A'+ vars, '_blank'); 
    };
    if($('#jns_laporan').val()==3){
      vars = "?token="     + $('input[name=_token]').val();
        vars += "&tahun="     + $('#tahun_prarka').val();
        vars += "&id_dokumen="     + $('#no_dokumen').val();
        vars += "&kota="   + $('#nama_kota_lap').val();
        vars += "&tanggal="   + $('#tgl_laporan_x').val(); 
        window.open('../RAPBDLamp2B'+ vars, '_blank'); 
    };
    if($('#jns_laporan').val()==6){
      vars = "?token="     + $('input[name=_token]').val();
        vars += "&tahun="     + $('#tahun_prarka').val();
        vars += "&id_dokumen="     + $('#no_dokumen').val();
        vars += "&kota="   + $('#nama_kota_lap').val();
        vars += "&tanggal="   + $('#tgl_laporan_x').val(); 
        window.open('../RAPBDLamp5'+ vars, '_blank'); 
    };
    // if($('#jns_laporan').val()==4){
    //   vars = "?token="     + $('input[name=_token]').val();
    //     vars += "&tahun="     + $('#tahun_prarka').val();
    //     vars += "&sub_unit="     + $('#sub_prarka2').val();
    //     vars += "&id_dokumen="     + $('#no_dokumen').val();
    //    window.open('../PrintPraRKA2AP'+ vars, '_blank'); 
    // };
    // if($('#jns_laporan').val()==5){
    //   vars = "?token="     + $('input[name=_token]').val();
    //     vars += "&tahun="     + $('#tahun_prarka').val();
    //     vars += "&sub_unit="     + $('#sub_prarka2').val();
    //     vars += "&id_dokumen="     + $('#no_dokumen').val();
    //     vars += "&id_kegiatan="     + $('#keg_prarka').val();
    //    window.open('../PrintPraRKAAP'+ vars, '_blank'); 
    // };
         
});


});