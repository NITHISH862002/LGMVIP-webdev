const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const _=require("lodash");



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
// LOCAL HOST DB mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect("mongodb+srv://todolist-Nithish:Nithish862@cluster0.ssdzw.mongodb.net/todolistDB");

const itemSchema = {
  name: {
    type: String,
    required: [true, "Please Enter the task"],
  }
};
const Item = mongoose.model("Item", itemSchema);

const Item1 = new Item({
  name: "Maths Lab",
});

const Item2 = new Item({
  name: "Hacker Rank",
});

const Item3 = new Item({
  name: "CNN",
});
const defaultArray = [Item1, Item2, Item3];


const ListSchema= {
  name: String,
  items:[itemSchema]
};
const List=mongoose.model("List",ListSchema);


app.get("/", function (req, res) {
  Item.find({}, function (err, foundItem) {
    if (foundItem.length === 0) {
      Item.insertMany(defaultArray, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newitems: foundItem });
    }
  });
});

// DYNAMCI ROUTE
app.get("/:customListName",function(req,res){
  const customListName=_.capitalize(req.params.customListName);
  

  List.findOne({name:customListName},function (err,found) {
    if(!err){
      if(!found){
        // create a new list
        const list= new List({
          name:customListName,
          items:defaultArray
        })

        list.save();
        res.redirect("/"+customListName);
      }
      else{
        // show an existing list
        res.render("list", { listTitle: found.name, newitems: found.items})
      }
    }    
  });

  

  
})

app.post("/", function (req, res) {
  const itemName= req.body.it;
  const listName =req.body.list;
  const item=new Item({
    name:itemName
  })
  if(listName==="Today")
  {
    
  item.save();
  res.redirect("/");
  }
  else{
    List.findOne({name:listName},function(err,found){
      found.items.push(item);
      found.save();
      res.redirect("/"+listName);
    })
  }
 
});

app.post("/delete",function(req,res)
{
  const checkedItem=req.body.chkbox;
  const listName=req.body.listName;

  if(listName==="Today")
  {
    Item.findByIdAndRemove(checkedItem,function(err){
      if(err)
      {
        console.log(err); 
      }
      else{
        console.log("Item deleted");
      }
      res.redirect("/");
    })

  }
  else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItem}}},
      function(err,found)
      {
      if(!err)
      {
        res.redirect("/"+listName);
      }
    });

  }
  
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (req, res) {
  console.log("Server has Started successfully");
});
