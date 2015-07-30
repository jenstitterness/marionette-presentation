$().ready(function() {

  displayBackboneView();

  displayMarionetteView();

});

var displayBackboneView = function() {
  //Define model/collection
  var Model = Backbone.Model.extend({
    id: undefined
  });
  var Collection = Backbone.Collection.extend({model: Model});

  //Build views
  var ChildView = Backbone.View.extend({
    template: _.template("id <%= id %>"),
    render: function() {
      return this.$el.html(this.template(this.model.attributes));
    }
  });

  var CollectionView = Backbone.View.extend({
    initialize: function() {this.views= [];},
    render: function() {
      if (this.collection) {
        var self = this,
            view;
        this.collection.each(function(model) {
          view = new ChildView({model: model});
          self.$el.append(view.render());
          self.views.push(view);
        });
      }
    }
  });

  var exampleCollection = new Collection();

  for (var i = 0; i < 5; i++) {
    exampleCollection.add(new Model({id: i}));
  }

  // create view object
  var collectionViewInstance = new CollectionView({collection: exampleCollection});

  // render view and add to page
  collectionViewInstance.render();
  $('#backboneContainer').append(collectionViewInstance.$el);
};

var displayMarionetteView = function() {
  //Define model/collection
  var Model = Backbone.Model.extend({
    id: undefined
  });
  var Collection = Backbone.Collection.extend({model: Model});

  //Build views
  var ChildView = Marionette.ItemView.extend({
      template: _.template("id <%= id %>"),
      model: Model
  });


  var CollectionView = Marionette.CollectionView.extend({
    childView: ChildView
  });

  // build collection for collection view
  var exampleCollection = new Collection();

  for (var i = 0; i < 5; i++) {
    exampleCollection.add(new Model({id: i}));
  }

  // create view object
  var collectionViewInstance = new CollectionView({collection: exampleCollection});

  // render view and add to page
  collectionViewInstance.render();
  // add to page
  $('#marionetteContainer').append(collectionViewInstance.$el);
};
