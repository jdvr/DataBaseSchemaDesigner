Template.dbfield.events({
    'click .icon-lock':function(evt, tmpl){
        evt.stopPropagation();
        evt.preventDefault();
        Session.set('editing_field', this._id);
    },
    'click .icon-trash':function(evt, tmpl){
        evt.stopPropagation();
        evt.preventDefault();
        DBfields.remove({_id:this._id});
    },
    'keyup .efield': function(evt, tmpl){
        evt.stopPropagation();
        evt.preventDefault();
        if(evt.which == 13){
            var fieldName = tmpl.find('.efield').value;
            if(fieldName){
                DBfields.update(this._id,{$set:{name:fieldName}});
                Session.set('editing_field', null);
            }
        }
    }
});

Template.dbfield.helpers({
   editing_field: function(){
       return Session.equals('editing_field', this._id);
   }
});
