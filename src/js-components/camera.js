export default useCamera
function useCamera(canvas,gl)
{
    /*==================== MATRIX ====================== */

    function get_projection(angle, a, zMin, zMax) {
        var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
        return [
            0.5/ang, 0 , 0, 0,
            0, 0.5*a/ang, 0, 0,
            0, 0, -(zMax+zMin)/(zMax-zMin), -1,
            0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 
            ];
    }

    var proj_matrix = get_projection(40, canvas.width/canvas.height, 1, 1000);
    var mo_matrix = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ];
    var view_matrix = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ];

    gl.viewport(0.0, 0.0, canvas.width, canvas.height);

    view_matrix[14] = view_matrix[14]-30;

    /*================= Mouse events ======================*/

    var AMORTIZATION = 0;//0.95;
    var drag = false;
    var old_x, old_y;
    var dX = 0, dY = 0;

    var action = null


    var ctrlDown = false;
    document.addEventListener('keydown', function(event) {
        if (event.key == "Control") {
            ctrlDown = true;
        }
    });
    document.addEventListener('keyup', function(event) {
        if (event.key == "Control") {
            ctrlDown = false;
        }
    });




    var mouseDown = function(e) {

        // if(!ctrlDown) return;
        //selection or middle button
        if(e.button == 2)
        {
            action = "pan"
        }
        else
        {
            action = "rotate"
        }


    drag = true;
    old_x = e.pageX, old_y = e.pageY;
    e.preventDefault();
    return false;
    };

    var mouseUp = function(e){
    drag = false;
    };
    const mouse = {x:0,y:0};
    var mouseMove = function(e) {
        
        const rect = canvas.__element.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) * gl.canvas.width / gl.canvas.clientWidth;
        mouse.y = gl.canvas.height - (e.clientY - rect.top) * gl.canvas.height / gl.canvas.clientHeight - 1;
        
        if (!drag) return false;

            dX = (e.pageX-old_x)*2*Math.PI/canvas.width,
            dY = (e.pageY-old_y)*2*Math.PI/canvas.height;

            if(action == "rotate")
            {
                THETA+= dX;
                PHI+=dY;
            }
            else if(action == "pan")
            {
            pan(dX,dY);
            }
            old_x = e.pageX, old_y = e.pageY;



        e.preventDefault();
    };

    function pan(dx,dy)
    {
        view_matrix[12] -= dx * view_matrix[14]/2;
        view_matrix[13] += dy * view_matrix[14]/2;
    }

    canvas.$on("mousedown", mouseDown);
    canvas.$on("mouseup", mouseUp);
    canvas.$on("mouseout", mouseUp);
    canvas.$on("mousemove", mouseMove);

    //scroll
    var mouseWheel = function(e) {
        e.preventDefault();
        var delta = e.wheelDelta ? e.wheelDelta/40 : e.detail ? -e.detail : 0;
        var amount = 1.3
        if (delta) zoom(delta < 0 ? 1*amount : 1/amount);
        return e.preventDefault() && false;
    };
    function zoom(z) {
       
        view_matrix[14] *= z;
        console.log(view_matrix[14])
    }
    canvas.$on("wheel", mouseWheel);

    /*=========================rotation================*/

    function rotateX(m, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var mv1 = m[1], mv5 = m[5], mv9 = m[9];

        m[1] = m[1]*c-m[2]*s;
        m[5] = m[5]*c-m[6]*s;
        m[9] = m[9]*c-m[10]*s;

        m[2] = m[2]*c+mv1*s;
        m[6] = m[6]*c+mv5*s;
        m[10] = m[10]*c+mv9*s;
    }

    function rotateY(m, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var mv0 = m[0], mv4 = m[4], mv8 = m[8];

        m[0] = c*m[0]+s*m[2];
        m[4] = c*m[4]+s*m[6];
        m[8] = c*m[8]+s*m[10];

        m[2] = c*m[2]-s*mv0;
        m[6] = c*m[6]-s*mv4;
        m[10] = c*m[10]-s*mv8;
        // check is the orientation is greater than 90 degrees

    }

    /*=================== Drawing =================== */

    // var THETA = 0,
    // PHI = 0;

    var THETA = .8,
    PHI = .8;

    function update()
    {
        if (!drag) {
            dX *= AMORTIZATION, dY*=AMORTIZATION;
            THETA+=dX, PHI+=dY;
        }
        //set model matrix to I4

        mo_matrix[0] = 1, mo_matrix[1] = 0, mo_matrix[2] = 0,
        mo_matrix[3] = 0,

        mo_matrix[4] = 0, mo_matrix[5] = 1, mo_matrix[6] = 0,
        mo_matrix[7] = 0,

        mo_matrix[8] = 0, mo_matrix[9] = 0, mo_matrix[10] = 1,
        mo_matrix[11] = 0,

        mo_matrix[12] = 0, mo_matrix[13] = 0, mo_matrix[14] = 0,
        mo_matrix[15] = 1;

        PHI = Math.max(-Math.PI/2, Math.min(Math.PI/2, PHI));
        rotateY(mo_matrix, THETA);
        rotateX(mo_matrix, PHI);

        function update_program(program)
        {
            program.uniform_matrix_4_mat_float.projection_matrix = proj_matrix
            program.uniform_matrix_4_mat_float.view_matrix = view_matrix
            program.uniform_matrix_4_mat_float.model_matrix = mo_matrix
        }
        return update_program
    }
    function resetPan()
    {
        view_matrix[12] = 0;
        view_matrix[13] = 0;
    }

    function resetRotation()
    {
        THETA = .8,
        PHI = .8;
    }
    function setZoom(value)
    {
        view_matrix[14] = value;
    }
    return {updateCamera:update}
}



