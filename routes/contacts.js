const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../modules/user");
const Unit = require("../modules/unit");
const Project = require("../modules/project");
const Tree = require('../modules/projectTree');
const Mail = require('../modules/mail');
const Message = require('../modules/message');
const mongoose = require('mongoose');
var middleware = require("../middleware");


//show the user's contact list
router.get("/users/:id/contacts" ,middleware.checkOwnership,(req ,res)=>{
    User.findById(req.params.id ,'-events -unit').populate({
        path: 'contacts',
        select: '-events -sentProjects -area -office -tags -firstName -lastName -isLoggedUser -receivedProjects -assignedProjects -sentMails -receivedMails -contacts -unit'
    }).exec((err ,user)=>{
        if(err){throw err;}
        else{
            var contactsForSearch = user.contacts;
            var contacts = [];
            for (i = 0; i < 26; i++) {
                // console.log((i+10).toString(36));
                // console.log(String.fromCharCode(97 + i)); //(97 lowerCase) - (65 upperCase)
                var chrL = String.fromCharCode(97 + i);
                var chrU = String.fromCharCode(65 + i);
                var chrArray = [];
               // console.log(user.contacts);
                user.contacts.forEach(function(contact){
                    if(contact.username[0] == chrL || contact.username[0] == chrU){
                        chrArray.push(contact);
                    }
                });
                contacts.push(chrArray.sort());
            }
            User.find({} ,'-children -events -sentProjects -receivedProjects -tags -office -firstName -lastName -area -isLoggedUser -assignedProjects -sentMails -receivedMails -contacts -unit' ,(err ,usersList)=>{
                if(err){throw err;}
                res.render("users/contacts" ,{user: user ,contacts: contacts ,usersList: JSON.stringify(usersList) ,contactsForSearch: JSON.stringify(contactsForSearch)});
            });
        }
    });
});

//add new contact
router.post("/users/:id/contacts" ,middleware.checkOwnership,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        User.findById(req.body.newContactId ,(err ,newContact)=>{
            if(err){throw err;}
            console.log(newContact);
            user.contacts.push(newContact);
            user.save(()=>{
                res.redirect("back");
               // res.redirect("/users/"+req.params.id+"/contacts");
            });
        });
    });
});

//delete a contact
router.delete("/users/:id/contacts/:contactId" ,(req ,res)=>{
    User.findById(req.params.id ,(err ,user)=>{
        if(err){throw err;}
        const index = user.contacts.indexOf(req.params.contactId);
        if (index > -1) {
            user.contacts.splice(index, 1);
            user.save(()=>{
                res.redirect("back");
               // res.redirect("/users/"+req.params.id+"/contacts");
            });
        }
    });
});



//show chat
router.get("/users/:id/contacts/:cnctId/chat" ,(req ,res)=>{
    // {
    //     path: 'sentMessages'
    // },{
    //     path: 'receivedMessages'
    // },{
    //     path: 'receivedMessages.sent_by',
    //     select: '-events -sentProjects -area -office -tags -firstName -lastName -isLoggedUser -receivedProjects -assignedProjects -sentMails -receivedMails -contacts -unit'
    // }

    // User.findById(req.params.id ,(err ,user)=>{
    //     if(err){throw err;}
        // var ObjectId = require('mongoose').Types.ObjectId;
        // var paramsId = new ObjectId( (req.params.id.length < 12) ? "123456789012" : req.params.id);
        // var paramsCnctId = new ObjectId( (req.params.cnctId.length < 12) ? "123456789012" : req.params.cnctId);
        
        // var query = {$or: []};
        // if ((req.params.id.match(/^[0-9a-fA-F]{24}$/))&&(req.params.cnctId.match(/^[0-9a-fA-F]{24}$/))) {
        //     query.$or.push({sent_by: req.params.id ,sent_to: req.params.cnctId});
        //     query.$or.push({sent_by: req.params.cnctId ,sent_to: req.params.id});
        // }
    //     Message.find({$or: [
    //         {sent_by: req.params.id+"" ,sent_to: req.params.cnctId+""},
    //         {sent_by: req.params.cnctId+"" ,sent_to: req.params.id+""}
    //     ]}).populate({
    //         path: 'sent_by',
    //         select: '-children -events -sentProjects -area -office -tags -firstName -lastName -isLoggedUser -receivedProjects -assignedProjects -sentMails -receivedMails -contacts -unit'
    //     },{
    //         path: 'sent_to',
    //         select: '-children -events -sentProjects -area -office -tags -firstName -lastName -isLoggedUser -receivedProjects -assignedProjects -sentMails -receivedMails -contacts -unit'
    //     }).exec((err ,chat)=>{
    //         if(err){throw err;}
    //         User.findById(req.params.cnctId ,'-children -events -sentProjects -area -office -tags -firstName -lastName -isLoggedUser -receivedProjects -assignedProjects -sentMails -receivedMails -contacts -unit' ,(err ,contact)=>{
    //             if(err){throw err;}
    //             res.render("users/chat" ,{user: user ,units: units ,contact: contact ,chat: chat});
    //         });
    //     });
    // });
    User.findById(req.params.id).populate('sentMessages receivedMessages').exec((err ,user)=>{
        if(err){throw err;}
        else{
            //getting old discussion
            var sentMessages = [];
            user.sentMessages.forEach(function(message){
                if(message.sent_to == req.params.cnctId){
                    sentMessages.push(message);
                }
            });
            var receivedMessages = [];
            user.receivedMessages.forEach(function(message){
                if(message.sent_by == req.params.cnctId){
                    receivedMessages.push(message);
                }
            });
            var chat = sentMessages.concat(receivedMessages);
            chat.sort((a, b) => a.sent_at.localeCompare(b.sent_at));
            User.findById(req.params.cnctId ,'-children -events -sentProjects -area -office -tags -firstName -lastName -isLoggedUser -receivedProjects -assignedProjects -sentMails -receivedMails -contacts -unit' ,(err ,contact)=>{
                if(err){throw err;}
                //clearing messageNotifications from unwanted notifs
                var trv = false;
                user.messageNotifications.array.forEach(notification => {
                    if(notification.senderId == req.params.cnctId){
                        trv = true;
                        user.messageNotifications.array.splice(user.messageNotifications.array.indexOf(notification) ,1);
                    }
                });
                if(trv){
                    user.save(() => {
                        res.render("users/chat" ,{user: user ,contact: contact ,chat: chat});
                    });
                }else{
                    res.render("users/chat" ,{user: user ,contact: contact ,chat: chat});
                }
            });
        }
    });
});


module.exports = router;