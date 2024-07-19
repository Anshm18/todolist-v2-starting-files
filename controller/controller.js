const { todo } = require("../model/todoModel.js");
const list = require("../model/listModel.js");
const _ = require('lodash');

const item1 = new todo({name:'welcome to todo list'});

const item2 = new todo({name:'hit + button to add items'});

const item3 = new todo({name:'<--- hit checkbox to delete this from the to do list'});

const arr = [item1,item2,item3];

const home = async (req, res) => {
    try {
        todo.find().then((items) => {
            if (items.length === 0) {
                todo.insertMany(arr).then((result) => {
                    console.log(result);
                });
                res.redirect("/");
            } else {
                res.render("list", { listTitle: "Today", newListItems: items });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const homePost = async (req, res) => {
    try {
        const itemNam = req.body.newItem;
        const lname = req.body.list;
        const itemNo1 = new todo({
            name: itemNam
        });

        if (lname === "Today") {
            itemNo1.save();
            res.redirect("/");
        } else {

            list.findOne({ name: lname }).then((nitems) => {
                nitems.lista.push(itemNo1);
                nitems.save();
                res.redirect('/' + lname);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const about = async (req, res) => {
    try {
        res.render("about");
    } catch (error) {
        console.log(error);
    }
}

const PostDelete = async (req, res) => {
    try {
        const checkItem = req.body.check;
        const listn = req.body.listName;

        if (listn === 'Today') {
            todo.findByIdAndDelete(checkItem).then((err) => {
                console.log(err);
            });
            res.redirect("/");
        }
        else {
            list.findOneAndUpdate({ name: listn }, { $pull: { lista: { _id: checkItem } } }).then((err) => {
                console.log(err);
            });
            res.redirect('/' + listn);
        }
    } catch (error) {
        console.log(error);
    }
}

const paramNew = async (req, res) => {
    try {
        const custom = _.capitalize(req.params.new);

        list.findOne({ name: custom }).then((items) => {
            if (!items) {
                const list1 = new list({
                    name: custom,
                    lista: arr
                });

                list1.save();
                res.redirect("/" + custom);
            } else {
                res.render("list", { listTitle: custom, newListItems: items.lista });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    home,
    homePost,
    about,
    PostDelete,
    paramNew
}