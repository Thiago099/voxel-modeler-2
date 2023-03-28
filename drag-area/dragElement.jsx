export {useDragElement}

function is_bound(center,rect)
{
  const x = center.x
  const y = center.y
  const left = rect.left
  const right = rect.right
  const top = rect.top
  const bottom = rect.bottom
  return x >= left && x <= right && y >= top && y <= bottom
}
function useDragElement(app)
{
   
   const dock_area =app.$find('.dock-area').map(x=>{return{element:x,children:[]}})
  return {dragElement}
  function dragElement(element, header = null, dock_area_element = null) {
    if(dock_area_element != null) {
      var d = dock_area.find(x=>x.element === dock_area_element)
      if(d != null) {
        d.children.push(element)
        build_dock_area(d)
      }
    }
      
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const drag_handle = header || element;
    drag_handle
    .$on('mousedown',dragMouseDown)
    .$style('cursor','move')
  
    function dragMouseDown(e) {
      if(e.button !== 0) return

      e = e || window.event;
      e.preventDefault();
      
      element.$style('width','400px')
      element.$style('height','auto')
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    var my_area = null
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      var top = element.offsetTop - pos2;
      var left = element.offsetLeft - pos1;
      element
      .$style('top',top + "px")
      .$style('left',left + "px")
      if(my_area!=null) {
        var index = my_area.children.indexOf(element)
        if(index > -1) {
          my_area.children.splice(index,1)
          build_dock_area(my_area)
        }
      }
    }
  
    function closeDragElement() {


      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      const rect = element.__element.getBoundingClientRect()
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
      for(var i = 0; i < dock_area.length; i++) {

        var dock_element = dock_area[i].element
        const dock_rect = dock_element.__element.getBoundingClientRect()
        if(!is_bound(center,dock_rect)) {
          continue
        }
        var children = dock_area[i].children
        children.push(element)
        my_area = dock_area[i]

        build_dock_area(dock_area[i])




        return
      }

    }
  }
  function build_dock_area(dock_area)
  {
    const dock_rect = dock_area.element.__element.getBoundingClientRect()
    const fraction = dock_rect.height / dock_area.children.length
    var top = 0
    for(var j = 0; j < dock_area.children.length; j++) {
      var child = dock_area.children[j]
      child.$style('top',dock_rect.top + top + 'px')
      child.$style('left',dock_rect.left + 'px')
      child.$style('width',dock_rect.width)
      child.$style('height',fraction + 'px')
      top += fraction
    }
  }
}


