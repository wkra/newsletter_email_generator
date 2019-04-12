var app = new Vue({
  el: '#app',
  data: function() {
    return {
      isVueInit: true,
      imgs: [],
      sortDirection: 'a-z',
      filesType: ['image/jpeg', 'image/gif', 'image/png']
    }
  },
  computed: {
    showTemplate: function(){
      return this.imgs.length;
    }
  },
  methods: {
    onUpload: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.getFilesAttributes(files);
      }
    },
    getFilesAttributes: function(files) {
      var img,
      file;
      for (i=0; i < files.length; i++) {
        file = files[i];
        if (this.filesType.indexOf(file.type) > -1) {
          img = new Image();
          img.src = window.URL.createObjectURL( files[i] );

          this.imgs.push(
            {name: files[i].name,
            height: 0,
            src: img.src,
            url: '#'});

          this.getFileHeight(img, this.imgs.length -1);
        }
      }
    },
    getFileHeight: function(img, index) {
      var self = this;
      img.onload = function() {
          self.imgs[index].height = img.naturalHeight;
      };
    },
    removeImg: function(index) {
      this.imgs.splice(index, 1);
    },
    sortImgs: function () {
      this.imgs.sort(this.compareName);
      this.changeSortDirection();
    },
    compareName: function(a,b) {
      if (a.name < b.name)
        return this.sortDirection === 'a-z' ? -1 : 1;
      if (a.name > b.name)
        return this.sortDirection === 'a-z' ? 1 : -1;
      return 0;
    },
    changeSortDirection: function(){
      this.sortDirection = this.sortDirection.split('').reverse().join('')
    }
  }
})
