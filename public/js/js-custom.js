
/* MYCX MERGE VERSION */
//----------------------------------------
// VERSIONING
//----------------------------------------
$('#version').append('Version 1.1.1834');
//-----------------------------------------------------------------------------------
//		ADD TAB
//-----------------------------------------------------------------------------------
function addtab(li,content,label,src){
	var x = content;
	if($('#' + li).length == 0) {
	  if(src !== undefined){
			$('#ultab li:last-child').after('<li id="'+li+'"><a data-toggle="tab" href="#'+content+'">'+label+' &nbsp <span id="'+li+'"class="badge badge-danger">X</span></a></li>');
			$('.tab-content').append('<div class="tab-pane" id="'+content+'"><div class="row"><div class="col-xs-12">'+
				'<iframe onload="hideload(\''+x+'\')" name="fr'+content+'" id="fr'+content+'" background-color="#FFFFFF" class="col-xs-12 frame" scrolling="yes" src="'+src+'"></div></div>');
			$('.nav-tabs #'+li+' a').click();
			showload(x);
		}
	}else{
		$('.nav-tabs #'+li+' a').click();
		var iframe = document.getElementById('fr'+x);
		iframe.src = src;
		showload(x);
	}
	
}
//-----------------------------------------------------------------------------------
//		END ADD TAB
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//		FILTER PENCARIAN 
//-----------------------------------------------------------------------------------
/*function number(event){
	var charCode = (event.which) ? event.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
	return false;
	return true;
}
*/

function cekusertype(type){   // USER 147 CANNOT SEARCH BGES CUSTOMER 
	if(type == '25'){  // USER AGENT DDS SEARCH DDS EMAIL ONLY
		$('#jenisCari option[value="bges"]').hide();
		$('#jenisCari option[value="retail"]').hide();
		$('#jenisCari option[value="none"]').hide();
		$('#jenisCari option[value="dds"]').show();
		$('#newticnon').hide();
		$('#trackful').hide();
		$('#irm').hide();
		$('#addcont').hide();
		$('#numserv').hide();
		$('#referenum').hide();
		$('#openirm').hide();
		$('#tes').hide();

	}
	if(type=='1'||type=='2'||type=='4'||type=='5'||type=='19'){  // USER AGENT DDS SEARCH DDS EMAIL ONLY
		$('#jenisCari option[value="bges"]').hide();
		$('#jenisCari option[value="dds"]').hide();
		
		
	}
	if(type=='0'){
		$('#jenisCari option[value="dds"]').show();
		
		
	}
	if(type=='50'){
		$('#openirm').hide();
		$('#tes').hide();
		

	}
	if(type=='17'){
		
		$('#tes').hide();
		

	}
	
}

	$('#CustomerId').hide();
	$('#servNum').hide();
	$('#frontName').hide();
	$('#jenisCari option[value="dds"]').hide();
	
	
$('#jenisCari').change(function(){ 		// BGES:BY SID + BY NAME; INDIHOME:BY SID ONLY
	var jeniscari = $('#jenisCari').val();
	if(jeniscari=='retail'){
		$('#CustomerId').hide();
		$('#frontName').hide();
		$('#CustomerId').val('');
		$('#frontName').val('');
		$('#servNum').val('');
		$('#servNum').show();
		$('#servNum').attr('placeholder','Service Number');
		$('#servNum').attr("onkeypress","return number(event)");
		//number();//$('#servNum').mask('9?999999999999999',{placeholder :" "});
	}else if(jeniscari=='bges'){
		$('#CustomerId').show();
		$('#servNum').show();
		$('#frontName').show();
		$('#CustomerId').val('');
		$('#frontName').val('');
		$('#servNum').val('');
		$('#servNum').val('');
		$('#servNum').attr('placeholder','Service Number / Service ID');
		$('#servNum').attr("onkeypress","return number(event)");
		//$('#servNum').unmask('9?999999999999999',{placeholder :" "});
	}else if(jeniscari=='dds'){ //DDS
		$('#CustomerId').hide();
		$('#servNum').show();
		$('#frontName').hide();
		$('#CustomerId').val('');
		$('#frontName').val('');
		$('#servNum').val('');
		$('#servNum').attr('placeholder','Email');
		$('#servNum').removeAttr("onkeypress","return number(event)");
		//$('#servNum').unmask('9?999999999999999',{placeholder :" "});
	
	}else{
		$('#CustomerId').hide();
		$('#servNum').hide();
		$('#frontName').hide();
		$('#ddsname').hide();
		$('#frontName').val('');
		$('#servNum').val('');
	}
});
//-----------------------------------------------------------------------------------
//		END FILTER PENCARIAN 
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//		LOADING INDICATOR
//-----------------------------------------------------------------------------------
function showload(id_parent){
	var exist = $('#loading_'+id_parent).length;
	if(exist<1){
		$("#"+id_parent).append('<div class="cxloading" id="loading_'+id_parent+'"><center><i class="icon-spinner icon-spin bigger-300"></i></center></div>')
	}
};

function hideload(id_parent){
	$("#loading_"+id_parent).remove();
};

$('#usermanejemen').addClass("Hide");
//-----------------------------------------------------------------------------------
//		END LOADING INDICATOR
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//		REDIRECT TO LOGIN
//-----------------------------------------------------------------------------------

function tologin(anum){
	//console.log(anum+'-number');

	if(anum){
		window.location = baseURL + '/login/?anumber='+anum;
	}else{
		window.location = baseURL + '/login/';
	}
}
function ceklogin(result){
	if(result['code']==401){
		bootbox.dialog({
			message: "<span class='bigger-110'>"+ result['info'] +"</span>",
			closeButton: false,
			buttons:
				{
					"OK" :
					{
						"label" : "<i class='icon-ok'></i> OK ",
						"className" : "btn-sm btn-danger",
						"callback": function() {
							tologin();
						}
					}
						
				}
		});
	}
}

//-----------------------------------------------------------------------------------
//		END REDIRECT TO LOGIN
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//		OPEN TICKET
//-----------------------------------------------------------------------------------

function openticket(data){
    //var data = data[0];
    //console.log(data)
	var strFirstThree = data['refference'].substring(0,3);
		//console.log(strFirstThree);
		
		if (strFirstThree == 'IDS'){
			var alamat = '/ticket/ideas?orderid='+data['orderid']+'&prodid='+data['prodid'];
		}else{
			if(data['mode'] == "1" || data['mode'] == "2"){
				var alamat = '/ticket/view?orderid='+data['orderid']+'&prodid='+data['prodid'];
			}else if(data['mode'] == "3"){
				var alamat = '/ticket/findtiketnon?orderid='+data['orderid']+'&prodid='+data['prodid'];
			}else if(data['mode'] == "4"){
					var alamat = '/ticket/smartsolver?orderid='+data['orderid']+'&prodid='+data['prodid'];
			}
		}
	var id_li 		= 'litiket'+data['refference'];
	var id_content 	= 'tkt'+data['refference'];
	var label_tab 	= data['refference'];
	var src 		= alamat;
	addtab(id_li,id_content,label_tab,src);
}

function opendata(data,key){
	//console.log(data);
	if(data.length != 0){
		if(data.length>1){
			var id_li = 'li'+key;
			var id_content = 'c'+key;
			var label_tab = 'Ticket - '+key.substring(1);
			var src = '/ticket/searchticket?key='+key;
			addtab(id_li,id_content,label_tab,src);
		}else{
			openticket(data[0]);
		}
	}else{
		bootbox.dialog({
			message: "<span class='bigger-110'>Data Not Found</span>",
			buttons:
				{
					"OK" :
					{
						"label" : "<i class='icon-ok'></i> OK ",
						"className" : "btn-sm btn-danger"
					}
						
				}
		});
	}
}



//-----------------------------------------------------------------------------------
//		END OPEN TICKET
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//		USER CUSTOMER
//-----------------------------------------------------------------------------------

function loadcustomer(userid){
 	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: baseURL + '/jsondata/getusercustomer',
        data: { userid: userid },
       	error: function(xhr) {
                if(xhr.status != 200){
                  bootbox.dialog({
                      message: "<span class='bigger-110'>"+xhr.status+"-"+xhr.statusText+"<br>Silahkan coba kembali</span>",
                      buttons:
                      {
                          "OK" :
                           {
                              "label" : "<i class='icon-ok'></i> OK ",
                              "className" : "btn-sm btn-danger",
                              callback : function(){
                                }
                          }
                      }
                  });
                }
        	},
        success: function(result){
        	ceklogin(result);
        	//console.log(result);
        	if(result['code']==0){
		    	$('#recentcustomer').empty();
		    	var data = result['data'];
		    	for (i = 0; i < data.length; i++) { 
				    //text += cars[i] + "<br>";
				    $('#recentcustomer').append(
				    	'<li>'+
							'<a href="#" onClick="pilihcustomer(\''+data[i]['bpid']+'\',\''+data[i]['bpname']+'\')">'+
								'<i class="icon-double-angle-right"></i> '+
								data[i]['bpname']+
							'</a>'+
						'</li>'
				    	);
				};
			}
        }
    });

}

function pilihcustomer(bp_id,bp_name){
    var id_li = 'i'+bp_id;
    var id_content = 'c' + bp_id ;
    var label_tab = bp_name;
    var src = '/customer/findbges?customerId='+bp_id+'&username='+username;
    window.parent.addtab(id_li,id_content,label_tab,src);
}

//-----------------------------------------------------------------------------------
//		END USER CUSTOMER
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//		USER 
//-----------------------------------------------------------------------------------

function userprofile(userid){
 	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: baseURL + '/jsondata/getuserprofile',
        data: { userid: userid },
       	error: function(xhr) {
                if(xhr.status != 200){
                  bootbox.dialog({
                      message: "<span class='bigger-110'>"+xhr.status+"-"+xhr.statusText+"<br>Silahkan coba kembali</span>",
                      buttons:
                      {
                          "OK" :
                           {
                              "label" : "<i class='icon-ok'></i> OK ",
                              "className" : "btn-sm btn-danger",
                              callback : function(){
                                }
                          }
                      }
                  });
                }
        	},
        success: function(result){
        	ceklogin(result);
        	//console.log(result);
        	var data=result['data'][0];
        	if(data['org_name']){
        		$('#userpullright').append('Welcome '+data['name']+', '+data['description']+' | '+data['org_name']);
        	}else{
        		$('#userpullright').append('Welcome '+data['name']+', '+data['description']);
        	}
			
			//$('#usermanejemen').addClass("Hide");
        }
    });

}

function pilihcustomer(bp_id,bp_name){
    var id_li = 'i'+bp_id;
    var id_content = 'c' + bp_id ;
    var label_tab = bp_name;
    var src = '/customer/findbges?customerId='+bp_id+'&username='+username;
    window.parent.addtab(id_li,id_content,label_tab,src);
}

//-----------------------------------------------------------------------------------
//		END USER 
//-----------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------
//	CEK PASSWORD DEFAULT
//-----------------------------------------------------------------------------------
function changePassword(){
	var id_li = 'changePassword';
	var id_content = 'ch_pass_tab';
	var label_tab = 'Change Password User';
	var src = '/user/changePassword';
	addtab(id_li,id_content,label_tab,src);
}
		
function cekpass(cek, passwd, cekauth, gencode){
	//alert(usertypeid);
	//alert('tes :' +cek+ '<br>'+passwd);
	if((cek == passwd && cekauth != 2) || (passwd == gencode && cekauth != 2)){
		$('#cekpass').click();
        if(passwd == gencode){
            bootbox.dialog({
			message: "<span class='bigger-110'>Password anda masih menggunakan Hasil code dari email.<br> Gunakan code sebagai password lama anda.<br><b>Silahkan ganti Password </b>. Terima Kasih!",
			buttons:
			{
				OK :
				{
					"label" : "<i class='icon-ok'> OK </a>",
					"className" : "btn-sm btn-danger"
									
				}
			}
            });
        }else{
            bootbox.dialog({
			message: "<span class='bigger-110'>Password anda masih default untuk menjaga keamanan ubah password anda. Terima Kasih",
			buttons:
			{
				OK :
				{
					"label" : "<i class='icon-ok'> OK </a>",
					"className" : "btn-sm btn-danger",
					callback : function(){
						changePassword();
					}
									
				}
			}
            });
        }
		
		return false;
	}
	
}

//-----------------------------------------------------------------------------------
//	END CEK PASSWORD DEFAULT
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//	SEARCH CUSTOMER -> ISISKA
//-----------------------------------------------------------------------------------
	
function cekisiska(servicenumber){
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: baseURL + '/jsondata/cekisiska',
        data: { servicenumber: servicenumber },
       	error: function(xhr) {
                if(xhr.status != 200){
                  bootbox.dialog({
                      message: "<span class='bigger-110'>"+xhr.status+"-"+xhr.statusText+"<br>Silahkan coba kembali</span>",
                      buttons:
                      {
                          "OK" :
                           {
                              "label" : "<i class='icon-ok'></i> OK ",
                              "className" : "btn-sm btn-danger",
                              callback : function(){
                                }
                          }
                      }
                  });
                }
        	},
        success: function(result){
						
        	if(result['code']==0){
				if(result['data']['servicestatus'] == '9'){//status PS
	        	var customer = result['data'];
	        	if(customer['bpId']){
	            	var src = '/customer/findcost?custId='+customer['bpId']+'&username='+username;
					addtab('i'+customer['bpId'],'c'+customer['bpId'],customer['customerName'],src);
					
				}
				}else 
				if(result['data']['servicestatus'] == '8'){//status VA
					
					bootbox.dialog({
					message: "<span class='bigger-110'>Status VA diarahkan Ke Tracking Fulfillment</span>",
					buttons:
						{
							"OK" :
							{
								"label" : "<i class='icon-ok'></i> OK ",
								"className" : "btn-sm btn-danger",
								callback : function(){
								var id_li = 'permintaan';
								var id_content = 'permintaan_tab';
								var label_tab = 'Tracking Fulfillment'//'Status Permintaan';
								var src = '/customer/permintaan';
								addtab(id_li,id_content,label_tab,src)
								}
							},
								
						}
					});
					
					
				}
        	}else{
        		bootbox.dialog({
					message: "<span class='bigger-110'>"+ result['info'] +"</span>",
					buttons:
						{
							"OK" :
							{
								"label" : "<i class='icon-ok'></i> OK ",
								"className" : "btn-sm btn-danger"
							},
								
						}
					});
        	}
        }
    });

}

//-----------------------------------------------------------------------------------
//	END SEARCH CUSTOMER -> ISISKA
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//	TEXT INFO BERJALAN
//-----------------------------------------------------------------------------------

function info(infodesc){
	var result = JSON.parse(atob(infodesc));
	var clas = [];
	var x = [];
	var a = [];
	pushInfo = '';
    //console.log(result);
	//for(var i=0 ; i <= result.length; i++){
	var i=0 ;
    while (i < result.length){
		// css class text color //
		if(result[i]['tipe'] == 'INFO'){ // Validasi type untuk warna text info 
			clas[i] = 'class="blues"';
		}else if(result[i]['tipe'] == 'HIMBAUAN'){
			clas[i] = 'class=" reds " ';
		}
		x[i] = result[i]['data'];
		a[i] = x[i].join('|');
		// end css class text color //
		
		// push data //
		pushInfo += "<span "+ clas[i]+"> <b> "
					+result[i]['tipe']+'</b> : <i>'+a[i]+
					'</i>| </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		$('#infotext')[0].innerHTML = pushInfo; // membuat output 
		// end push data //
        i++;
	}	
}

//-----------------------------------------------------------------------------------
//	END TEXT INFO BERJALAN
//-----------------------------------------------------------------------------------

$('button[name="bulet"]').click(function(){
	$(this).parents('table').find('.bulet-red').removeClass('bulet-red');
	$(this).addClass('bulet-red');
})


//-----------------------------------------------------------------------------------
//	INFO CHANGE LOG
//-----------------------------------------------------------------------------------

function infochangelog(infolog){
	var result = JSON.parse(atob(infolog));
	pushLog = '';
	var i=0 ;
	while (i < result.length){
		
		var description = result[i]['description'].split('-');
		
		pushLog += "<span><h5> <b> "
					+result[i]['title']+'</b></h5><div style="font-size:14px;margin-top: -20px;padding-bottom: 15px;">'+result[i]['description'].replace(/-/g,'<br>')+'</div>'
					'</span>';
		$('#infolog').innerHTML = pushLog; // membuat output 
		// end push data //
        i++;
	}
}

$('#infochangelogs').click(function(){
	bootbox.dialog({
		title : "<span class='bigger-110'><center> <h3><b>CHANGE LOG</b></h3></center>",
		message: pushLog,
		"className" : "my-custom-class",
	});
});

//-----------------------------------------------------------------------------------
//	END INFO CHANGE LOG
//-----------------------------------------------------------------------------------

function caritiket(reffnum,servicenumber,tiketid){
	reffnum ? $('#referenum').val(reffnum): null;
	servicenumber ? $('#numserv').val(reffnum): null;
	tiketid ? $('#ticketnum').val(reffnum): null;

	$('#btntkt').click();
}

//-----------------------------------------------------------------------------------
// SAVE INTERACTION
//-----------------------------------------------------------------------------------

function currentirmaid(irmaid){
	$('#currentirmaid').val(irmaid);
}

function getcurrentirmaid(){
	var irmaid = $('#currentirmaid').val();
	return irmaid;
}

/*var saveirmareturn;

function saveirmareturn(){
	return saveirmareturn;
}*/

function inupdateirma(reffnum){

	var irid = $('.ir-selected').attr('id');

	var iridx = irid ? irid.substring(5) : null;

	if (iridx){
	    var data = new Array();
	    // data['interaction_id']      = $('#current_id').val();
	    data['interaction_id']      = iridx;
	    data['interaction_sdtm']    = null;
	    data['interaction_edtm']    = null;
	    data['channel_type_id']     = null;
	    data['agent_id']            = null;
	    data['agent_name']          = null;
	    data['interaction_summary'] = null;
	    data['contact_name']        = null;
	    data['contact_number']      = null;
	    data['symptomp_id']         = null;
	    data['parent_interact_id']  = null;
	    data['action_reff_num']     = reffnum;
	    data['recording_url']       = null;
	    data['source_system']       = null;
	    data['service_number']      = null;
	    data['survey_status']       = null;
	    data['survey_result']       = null;
	    data['emotion']             = null;
	    data['status']              = null;
	    data['update']              = 1;

	    // console.log(data);
	    saveirma(data);
	}
}

function saveirma(data){
 	// console.log(data);
 	//var activity = null;

 	/*if(data['update'] == 0){
 		var activity = get_activity(data['interaction_id']);
 	}else{
 		var activity = null;
 	}*/
 	
 	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: baseURL + '/jsondata/saveirma',
        data: { 
        	interaction_id		:data['interaction_id'],
			interaction_sdtm	:data['interaction_sdtm'],
			interaction_edtm	:data['interaction_edtm'],
			channel_type_id		:data['channel_type_id'],
			agent_id			:data['agent_id'],
			agent_name			:data['agent_name'],
			interaction_summary	:data['interaction_summary'],
			contact_name		:data['contact_name'],
			contact_number		:data['contact_number'],
			symptomp_id			:data['symptomp_id'],
			parent_interact_id	:data['parent_interact_id'],
			action_reff_num		:data['action_reff_num'],
			recording_url		:data['recording_url'],
			source_system		:data['source_system'],
			service_number		:data['service_number'],
			survey_status		:data['survey_status'],
			survey_result		:data['survey_result'],
			emotion				:data['emotion'],
			status 				:data['status'],
			update 				:data['update'],
			fcr 				:data['fcr'],
			contact_type 		:data['contact_type'],

        },
       	error: function(xhr) {
                if(xhr.status != 200){
                  bootbox.dialog({
                      message: "<span class='bigger-110'>"+xhr.status+"-"+xhr.statusText+"<br>Silahkan coba kembali</span>",
                      buttons:
                      {
                          "OK" :
                           {
                              "label" : "<i class='icon-ok'></i> OK ",
                              "className" : "btn-sm btn-danger",
                              callback : function(){
                                }
                          }
                      }
                  });
                }
        	},
        success: function(result){
        	// ceklogin(result);
        	console.log(result);
        	if(result['code']==0){
        		if(data['update'] == 0){
		        	bootbox.dialog({
			            message: 'Interaksi berhasil disimpan',
			            buttons:
			            {
			                    "OK" :
			                     {
			                            "label" : "<i class='icon-ok'></i> OK ",
			                            "className" : "btn-sm btn-danger",
			                            callback : function(){
			                                
			                            }
			                    }
			            }
			        });    
			    }  
			}

			if(data['update']==0){
				window.document.getElementById('frco_irma_'+data["interaction_id"]).contentWindow.returnfunc(result['code']);
			}

			// saveirmareturn = result['code'];
        }
    });

}
//-----------------------------------------------------------------------------------
// SAVE INTERACTION
//-----------------------------------------------------------------------------------
/*$('.modal.aside').ace_aside();
				
$(document).one('ajaxloadstart.page', function(e) {
	//in ajax mode, remove before leaving page
	$('.modal.aside').remove();
	$(window).off('.aside')
});*/
/*
$("#ace-settings-btn").click(function(){
    $("#ace-settings-box").slideToggle("slow");
});*/

$("#toggle").click(function(){
	var x = $('#recent_irma').is(':empty');
	// alert(x);
	if( !x ) {
		$("#panel").slideToggle("slow");
	}
});

function set_new_recent(irmaid,sdtm){
	// var x = new Date(sdtm);
	// var sdtm = x.toISOString();
	del_recirma();
	var isi =
		'<div class="profile-activity clearfix" onclick="select_ir(this)" id="list_'+irmaid+'">'+
			'<div>'+
				'<img class="pull-left" alt="Alex Doe\'s avatar" src="../assets/avatars/avatar5.png">'+
				'<a class="user" href="#" id="'+irmaid+'"># '+irmaid+'</a> '+
				'<span id="name'+irmaid+'"></span> '+
				'<span id="anum'+irmaid+'"></span> '+
				// '<a href="#">Take a look</a>'+
				'<div><span id="irtype'+irmaid+'"></span>'+
						'<i class="icon-double-angle-right"></i>'+
					'<span id="irprod'+irmaid+'"></span>'+
						'<i class="icon-double-angle-right"></i>'+
					'</span><span id="irvoc'+irmaid+'"></span></div>'+
				'<div id="time'+irmaid+'" class="green">'+
					'<i class="icon-comments-alt bigger-110 green"></i> '+
					'<span id="sw_h'+irmaid+'">00</span>:<span id="sw_m'+irmaid+'">00</span>:<span id="sw_s'+irmaid+'">00</span>'+
				'</div>'+
				'<i class="icon-time"><abbr class="timeago" title="'+sdtm+'"></abbr></i>'+
				// '<div id="sdtm'+irmaid+'" class="time">'+sdtm+'</div>'+
				'<input style="display:none" type="text" id="act_'+irmaid+'"/>'+
				'<input style="display:none" type="text" id="penelpon'+irmaid+'"/>'+
				'<input style="display:none" type="text" id="no_penelpon'+irmaid+'"/>'+
				'<input style="display:none" type="text" id="symptom_code'+irmaid+'"/>'+
				'<input style="display:none" type="text" id="symptom_text'+irmaid+'"/>'+
				'<input style="display:none" type="text" id="desc'+irmaid+'"/>'+
			'</div>'+
			'<div class="tools action-buttons" style="display:none">'+
				'<a href="#" class="blue">'+
					'<i class="icon icon-pencil bigger-125"></i>'+
				'</a>'+

				'<a href="#" class="red">'+
					'<i class="icon icon-times bigger-125"></i>'+
				'</a>'+
			'</div>'+
		'</div>';
	$('#recent_irma').prepend(isi);
	$('#list_'+irmaid).click();
}

function del_recirma(){
	var total = $('.profile-activity').length;
	if(total == 5){
		$('.profile-activity:last').remove();
	}
}

function cancelirma(tab_id){
	var irmaid = tab_id.substring(7);
	var open = $('#time'+irmaid).hasClass('green');

	if(open){
		$('#list_'+irmaid).remove();
		// console.log('remove');
	}
}

function select_ir(item){
	$('.profile-activity').removeClass('ir-selected');
	$('#'+item.id).addClass('ir-selected');
}

function update_recent(irmaid,item){
		var penelpon;
		var no_penelpon;
		var symptom_code;
		var symptom_text;
		var desc;
	switch (item.id){
		
		// console.log(item.value);

        //case 'mobile' : return cekmobilenphone(); break;
        //case 'phone' : return cekmobilenphone(); break;
        case 'anum' : no_penelpon = item.value ; 
        	$('#anum'+irmaid).html(item.value);
 			$('#no_penelpon'+irmaid).val(no_penelpon);
        		break;
        case 'caller' : 
        	penelpon = item.value ; 
        	$('#penelpon'+irmaid).val(penelpon); 
        	$('#name'+irmaid).html(item.value); 
        		break;
        case 'sel_layanan' : 
        	$('#irtype'+irmaid).html(item.options[item.selectedIndex].text); 
        		break;
        case 'sel_product' : 
        	$('#irprod'+irmaid).html(item.options[item.selectedIndex].text); 
        		break;
        case 'sel_voc' : 
        	symptom_text = item.options[item.selectedIndex].label;
    		$('#symptom_text'+irmaid).val(symptom_text);
        	symptom_code = item.options[item.selectedIndex].text;
    		$('#symptom_code'+irmaid).val(symptom_code);
        	$('#irvoc'+irmaid).html(item.options[item.selectedIndex].label); 
        		break;
        case 'solutionsum' : 
        	desc = item.value; 
    		$('#desc'+irmaid).val(desc);
        	break;
    }

    // console.log(desc);


    // $("#yourdropdownid option:selected").text();

	/*if(name){
		$('name'+irmaid).val(name);
	}*/
}

function getinputirma(){
	var irid = $('.ir-selected').attr('id');
	var iridx = irid ? irid.substring(5) : null;

	if(iridx){		
		var inputirma = {};
		inputirma['penelpon'] = $('#penelpon'+iridx).val();
	    inputirma['no_penelpon'] = $('#no_penelpon'+iridx).val();
	    inputirma['symptom_code'] = $('#symptom_code'+iridx).val();
	    inputirma['symptom_text'] = inputirma['symptom_code'] ? $('#symptom_text'+iridx).val() : 'None';
	    inputirma['desc'] = $('#desc'+iridx).val();

	    var inputirmastring = JSON.stringify(inputirma);

	    return inputirmastring;
	}else{
		return 0;
	}

}

function update_timer(irmaid,item,value){
	switch (item){
        //case 'mobile' : return cekmobilenphone(); break;
        //case 'phone' : return cekmobilenphone(); break;
        case 'h' : $('#sw_h'+irmaid).html(value); break;
        case 'm' : $('#sw_m'+irmaid).html(value); break;
        case 's' : $('#sw_s'+irmaid).html(value); break;
    }
}

function end_call(irmaid){
	$('#time'+irmaid).toggleClass('green red');
	$('#time'+irmaid).empty();

	icon_end = '<i class="icon-comments bigger-110 red"></i>';
	$('#time'+irmaid).append(icon_end + 'interaction ended');
}

function cekendcall(){
	var irid = $('.ir-selected').attr('id');
	var iridx = irid ? irid.substring(5) : null;

	if(iridx){
		var open = $('#time'+iridx).hasClass('green');
	}else{
		var open = false;
	}

	return open;
}
/*
function updateactivity(actid){
	var irid = $('.ir-selected').attr('id');
	var iridx = irid ? irid.substring(5) : null;

	if(iridx){

		var open = $('#time'+iridx).hasClass('green');

		if(open){
			var act = $('#act_'+iridx).val();
			if(act){
				act += (','+actid);
			}else{
				act += actid;
			}

			$('#act_'+iridx).val(act);

			// alert(act);
			return true;
		}else{
			bootbox.dialog({
				message: "<span class='bigger-110'>Maaf, Interaksi telah berakhir</span>",
				closeButton: false,
				buttons:
					{
						"OK" :
						{
							"label" : "<i class='icon-ok'></i> OK ",
							"className" : "btn-sm btn-danger",
							"callback": function() {
								return false;
							}
						}
							
					}
			});
		}
	}else{
		return false;
	}
}

function get_activity(iridx){
	return $('#act_'+iridx).val();
}*/

function insertactivity(act){

	var irid = $('.ir-selected').attr('id');
	var iridx = irid ? irid.substring(5) : null;

	if(iridx){

		var open = $('#time'+iridx).hasClass('green');

		if(open){
			$.ajax({
		        type: 'POST',
		        dataType: 'json',
		        url: baseURL + '/jsondata/saveactivity',
		        data: { 
		        	act_code	:act,
		        	interaction_id	:iridx,
		        },
		       	error: function(xhr) {
		                if(xhr.status != 200){
		                  bootbox.dialog({
		                      message: "<span class='bigger-110'>"+xhr.status+"-"+xhr.statusText+"<br>Silahkan coba kembali</span>",
		                      buttons:
		                      {
		                          "OK" :
		                           {
		                              "label" : "<i class='icon-ok'></i> OK ",
		                              "className" : "btn-sm btn-danger",
		                              callback : function(){
		                                }
		                          }
		                      }
		                  });
		                }
		        	},
		        success: function(result){
		        	console.log(result);	        	
		        }
		    });
		// }else{
		// 	bootbox.dialog({
		// 		message: "<span class='bigger-110'>Maaf, Interaksi telah berakhir</span>",
		// 		closeButton: false,
		// 		buttons:
		// 			{
		// 				"OK" :
		// 				{
		// 					"label" : "<i class='icon-ok'></i> OK ",
		// 					"className" : "btn-sm btn-danger",
		// 					"callback": function() {
		// 						return false;
		// 					}
		// 				}
							
		// 			}
		// 	});
		}
	}
}
/*
$("#tes").click(function(){
        //alert("tes");
        		$('#ticketnum').val('');
				$('#numserv').val('');
				$('#referenum').val('');
		var mobileNumber=$('#mobileNo').val()
        //loadcustomercti("081320432053");
        loadcustomercti(mobileNumber);
          
    });
*/
//time ago
(function timeAgo(selector) {

    var templates = {
        prefix: "",
        suffix: " ago",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years"
    };

    var template = function (t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function (time) {
        if (!time) return;
        time = time.replace(/\.\d+/, ""); // remove milliseconds
        time = time.replace(/-/, "/").replace(/-/, "/");
        time = time.replace(/T/, " ").replace(/Z/, " UTC");
        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime()-(15*60*1000) - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
        seconds < 45 && template('seconds', seconds) || seconds < 90 && template('minute', 1) || minutes < 45 && template('minutes', minutes) || minutes < 90 && template('hour', 1) || hours < 24 && template('hours', hours) || hours < 42 && template('day', 1) || days < 30 && template('days', days) || days < 45 && template('month', 1) || days < 365 && template('months', days / 30) || years < 1.5 && template('year', 1) || template('years', years)) + templates.suffix;
    };

    var elements = document.getElementsByClassName('timeago');
    for (var i in elements) {
        var $this = elements[i];
        if (typeof $this === 'object') {
            $this.innerHTML = timer($this.getAttribute('title') || $this.getAttribute('datetime'));
        }
    }
    // update time every minute
    setTimeout(timeAgo, 60000);

})();

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100);
    var seconds = parseInt((duration/1000)%60);
    var minutes = parseInt((duration/(1000*60))%60);
    var hours = parseInt((duration/(1000*60*60))%24);
/*
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;*/

    return (hours>0)?hours + "h ":"" + (minutes>0)?minutes + "m ":"" + seconds + "s";
}

function irma_temp_id(irma_temp_id){
	// console.log(irma_temp_id);
	if(irma_temp_id){
		if(irma_temp_id == 0){
			$('#addInteraction').click();
		}else {
			irma(irma_temp_id,null,null,null,null,'temp',null);
		}
	}
}

$(document).ready(function() {
  $(".single-form-control").select2();
});

function closetab(id){
	// alert('ini : '+id);
	
	var anchor = $('span[id="'+id+'"]').parent('a');
	var tab = $('span[id="'+id+'"]').parent();
	
	$(anchor.attr('href')).remove();
	$(tab).parent().remove();
	$(".nav-tabs li").children('a').last().click();
}