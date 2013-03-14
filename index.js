$(document).ready(function(){
  WB2.login(function(){

  });

  // all the tags from the 'text' that in the sResult Object
  WB2.anyWhere(function(W){
    // 获取评论列表
    W.parseCMD("/statuses/user_timeline.json", function(sResult, bStatus){
        if(bStatus == true) {
          if(sResult.statuses.length) {
            getSources(sResult.statuses);
          }
        }
      },{
        userid : 12345678
      },{
          method: 'get'
      });
  });
});

function getSources (Res) {
  var result = [];

  for(var r in Res) {
    var wbItem = {};

    // repost other user's
    if(Res[r].retweeted_status) {
      // if it has a pic or not
      if(Res[r].retweeted_status.thumbnail_pic) {
        wbItem.imgSrc = Res[r].retweeted_status.bmiddle_pic;
        wbItem.thumb = Res[r].retweeted_status.thumbnail_pic;
      }
      var wb = Res[r].retweeted_status;
      wbItem.content = wb.text;
      // judge if has tags or not
      if(Res[r].text.split('#')[1]) {
        wbItem.tag = Res[r]
                      .text
                      .split('#')[1]
                      .clearTag();
        //wb.text = removeTag(wb.text);
      }
      wbItem.content = wb.text.generateUrl();
      result.push(wbItem);
    } else { //by the user self
      // judge if has tags or not

      var wb = Res[r];
      if(wb.text.split('#')[1]) {
        wbItem.tag = wb
                      .text
                      .split('#')[1]
                      .clearTag();

        wb.text = removeTag(wb.text).generateUrl();
      }
      wbItem.content = wb.text;
      result.push(wbItem);
    }
  }
  console.log(result);
  renderContent(result);
}

function removeTag(text) {
  var _arr = text.split('#');
  return _arr[2];
}

function isArray(a) {
    return (a.constructor.toString().match(/^function\ Array\(\)/) != null);
}

String.prototype.clearTag = function() {
  var _tags = [];

  if(this.split(':')[1]) {
    if(this.split(':')[1].split(',').length) {
      _tags = this.split(':')[1].split(',');
    }
  }
  return _tags;
};

String.prototype.generateUrl = function() {
  if(this.split('http://')[1]) {
    var res = 'http://' + this.split('http://')[1];
    return this.split('http://')[0] + '<a href="' + res + '">http://' + this.split('http://')[1] + '</a>'
  } else {
    return this;
  }
};
// <ul class="tag-list">
//   <li class="tag-item">#php</li>
//   <li class="tag-item">#nodejs</li>
//   <li class="tag-item">#xiaoxu</li>
// </ul>
function renderContent (content) {

  for(var i = 0; i < content.length; i++) {
    var _item = $('<div/>').addClass('weibo-item');
    var _itemcontent = $('<div/>').addClass('item-content');
    var _itemtag = $('<div/>').addClass('item-tag');
    
    _itemcontent.html(content[i].content)
      .appendTo(_item);
    if(content[i].imgSrc) {
      var _imgArea = $('<div/>').addClass('imgArea');
      $('<img/>').attr('src',content[i].thumb).appendTo(_imgArea);
      _imgArea.appendTo(_item);
    }

    if(content[i].tag) {
      var _taglist = $('<ul/>').addClass('tag-list');

      if(isArray(content[i].tag)) {
        for(var t in content[i].tag) {
          var _tag = $("<li/>")
                        .addClass('tag-item')
                        .html('#' + content[i].tag[t]);

          _tag.appendTo(_taglist);
        }  
      } else {
        var _tag = $("<li/>")
                      .addClass('tag-item')
                      .html('#' + content[i].tag);

        _tag.appendTo(_taglist);
      }
      _taglist.appendTo(_item);  
    }
    _item.appendTo('#container');

  }
}

function getUserWB () {
  if(WB2.checkLogin()) {

  } else {
    WB2.login();
  }
}

function getTags (argument) {
  // body...
}

function getTweet(res) {
  if(res.statuses) {
    if(res.statuses.length > 0) {
      var len = res.statuses.length;
      for(i = 0; i < len; i++){
        if(res.statuses[i].text.indexOf('#') >= 2){
          console.log(res.statuses[i].text);
        }
      }
    }
  }
}