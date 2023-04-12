import earcut from 'earcut';
export {getGeometry, getShape,weld, useMap,join_array}
function getShape(voxels)
{
    const [get_voxel_at] = useMap(voxels);
    const vertex_position = getVertexPosition(voxels, get_voxel_at);
    const [get_vertex_at] = useMap(vertex_position);
    const result_edges = getEdges(vertex_position,get_vertex_at, get_voxel_at);
    return [result_edges,vertex_position]
}
function getGeometry(voxels) {
    const [get_voxel_at] = useMap(voxels);
    const vertex_position = getVertexPosition(voxels, get_voxel_at);
    const [get_vertex_at] = useMap(vertex_position);
    const result_edges = getEdges(vertex_position,get_vertex_at, get_voxel_at);
    const pools = getFaces(result_edges, vertex_position, get_voxel_at);
    const [sub_pool_group, is_sub_pool] = getHierarchy(pools,vertex_position)
    return get_geometry(pools, vertex_position, sub_pool_group, is_sub_pool)
}

function weld(ids,vertexes)
{
    var vert_map = {}
    var result_vertexes = []
    var idx = 1
    for(var i = 0;i<vertexes.length;i++)
    {
        var key = vertexes[i].join(",")
        if(vert_map[key] == undefined)
        {
            vert_map[key] = idx
            result_vertexes.push(vertexes[i])
            idx ++
        }
    }
    for(var face of ids)
    {
        for(var id in face)
        {
            face[id] = vert_map[vertexes[face[id]].join(",")]
        }
    }

  return [result_vertexes,ids];
}




function join_array(array) {
    return array.join(",");
}
function useMap(voxels) {
    var map = {};
    for (var i = 0; i < voxels.length; i++) {
        var key = join_array(voxels[i]);
        map[key] = i;
    }
    function get_at(...p) {
        var key = join_array(p)
        return map[key];
    }
    return [get_at];
}
function getVertexPosition(voxels, get_voxel_at) {

    var vertexes = Array(voxels.length).fill(0).map(() => Array(4).fill(1));
    var minx = voxels[0][0]
    var miny = voxels[0][1]
    for (var i = 0; i < voxels.length; i++) {
        if (voxels[i][0] < minx) {
            minx = voxels[i][0];
        }
        if (voxels[i][1] < miny) {
            miny = voxels[i][1];
        }
        var next_x = get_voxel_at(voxels[i][0] + 1, voxels[i][1]);
        var next_y = get_voxel_at(voxels[i][0], voxels[i][1] + 1);
        var prev_x = get_voxel_at(voxels[i][0] - 1, voxels[i][1]);
        var prev_y = get_voxel_at(voxels[i][0], voxels[i][1] - 1);
        if (next_x != undefined) {
            vertexes[i][1] = 0;
            vertexes[i][2] = 0;
            vertexes[next_x][0] = 0;
            vertexes[next_x][3] = 0;

        }
        if (next_y != undefined) {
            vertexes[next_y][0] = 0;
            vertexes[next_y][1] = 0;
            vertexes[i][2] = 0;
            vertexes[i][3] = 0;

        }
        if (prev_x != undefined) {
            vertexes[prev_x][1] = 0;
            vertexes[prev_x][2] = 0;
            vertexes[i][0] = 0;
            vertexes[i][3] = 0;

        }
        if (prev_y != undefined) {
            vertexes[i][0] = 0;
            vertexes[i][1] = 0;
            vertexes[prev_y][2] = 0;
            vertexes[prev_y][3] = 0;
        }

    }

    var points = {}
    for (var index in voxels) {
        var x = voxels[index][0];
        var y = voxels[index][1];
        for (var i = 0; i < 4; i++) {
            var cx = x;
            var cy = y;
            if (i == 1) {
                cx += 1;
            }
            if (i == 2) {
                cx += 1;
                cy += 1;
            }
            if (i == 3) {
                cy += 1;
            }
            var idx = cx + "," + cy;
            if (points[idx] == undefined) {
                points[idx] = { number: 1, index, face_index: i };
            }
            else {
                points[idx].number += 1;
            }
        }
    }
    for (const [key, item] of Object.entries(points)) {
        if (item.number == 3) {
            vertexes[item.index][item.face_index] = 1;
        }

    }

    var vertex_position = [];
    for (var index in vertexes) {
        var x = voxels[index][0];
        var y = voxels[index][1];
        for (var vertex_index in vertexes[index]) {
            if (vertexes[index][vertex_index] == 1) {
                if (vertex_index == 0) {
                    vertex_position.push([x, y]);
                }
                if (vertex_index == 1) {
                    vertex_position.push([x + 1, y]);
                }
                if (vertex_index == 2) {
                    vertex_position.push([x + 1, y + 1]);
                }
                if (vertex_index == 3) {
                    vertex_position.push([x, y + 1]);
                }
            }
        }
    }

    function weld_points(ids) {
        var result = new Set()
        for (var i = 0; i < ids.length; i++) {
            var current = ids[i].join(",");
            result.add(current);
        }

        return Array.from(result);
    }
    return weld_points(vertex_position).map(item => item.split(",").map(item => parseInt(item)))
}
function getEdges(vertex_position,get_vertex_at,get_voxel_at)
{
    var min_x = vertex_position[0][0];
    var min_y = vertex_position[0][1];
    var max_x = vertex_position[0][0];
    var max_y = vertex_position[0][1];

    for (var index in vertex_position) {
        if (vertex_position[index][0] < min_x) {
            min_x = vertex_position[index][0];
        }
        if (vertex_position[index][1] < min_y) {
            min_y = vertex_position[index][1];
        }
        if (vertex_position[index][0] > max_x) {
            max_x = vertex_position[index][0];
        }
        if (vertex_position[index][1] > max_y) {
            max_y = vertex_position[index][1];
        }
    }

    function walk_axis(pivot, axis, direction) {
        var pos = pivot
        var next = undefined

        if (axis == "x") {
            if (direction == "forward") {
                do {
                    pos = [pos[0] + 1, pos[1]]
                    var next = get_vertex_at(pos);
                }
                while (next == undefined && pos[0] < max_x)
            }
            else {
                do {
                    pos = [pos[0] - 1, pos[1]]
                    var next = get_vertex_at(pos);
                }
                while (next == undefined && pos[0] > min_x)
            }
        }
        else {
            if (direction == "forward") {
                do {
                    pos = [pos[0], pos[1] + 1]
                    var next = get_vertex_at(pos);
                }
                while (next == undefined && pos[1] < max_y)
            }
            else {
                do {
                    pos = [pos[0], pos[1] - 1]
                    var next = get_vertex_at(pos);
                }
                while (next == undefined && pos[1] > min_y)
            }
        }
        return next;
    }

    var edges = new Set()
    function add_axis(index, direction, axis) {
        var a = index
        var b = walk_axis(vertex_position[index], axis, direction)
        if (b == undefined) return
        if (a > b) {
            var edge = [b, a]
        }
        else {
            var edge = [a, b]
        }
        var edge_a = vertex_position[edge[0]]
        var edge_b = vertex_position[edge[1]]
        if (validate_edge(edge_a, edge_b, axis))
            edges.add(join_array(edge))
    }

    function validate_edge(a, b, axis) {

        if (axis == "x") {
            var y = a[1]
            var x_start, x_end
            if (a[0] > b[0]) {
                x_start = b[0]
                x_end = a[0]
            }
            else {
                x_start = a[0]
                x_end = b[0]
            }
            if (get_voxel_at([x_start, y - 1]) == undefined) {
                for (var x = x_start; x < x_end; x++) {
                    if (get_voxel_at([x, y - 1]) != undefined) {
                        return false
                    }
                    if (get_voxel_at([x, y]) == undefined) {
                        return false
                    }
                }
            }
            else {
                for (var x = x_start; x < x_end; x++) {
                    if (get_voxel_at([x, y - 1]) == undefined) {
                        return false
                    }
                    if (get_voxel_at([x, y]) != undefined) {
                        return false
                    }
                }
            }

        }
        else {
            var x = a[0]
            var y_start, y_end
            if (a[1] > b[1]) {
                y_start = b[1]
                y_end = a[1]
            }
            else {
                y_start = a[1]
                y_end = b[1]
            }
            if (get_voxel_at([x - 1, y_start]) == undefined) {
                for (var y = y_start; y < y_end; y++) {
                    if (get_voxel_at([x - 1, y]) != undefined) {
                        return false
                    }
                    if (get_voxel_at([x, y]) == undefined) {
                        return false
                    }
                }
            }
            else {
                for (var y = y_start; y < y_end; y++) {
                    if (get_voxel_at([x - 1, y]) == undefined) {
                        return false
                    }
                    if (get_voxel_at([x, y]) != undefined) {
                        return false
                    }
                }
            }
        }

        return true
    }
    for (var index in vertex_position) {
        add_axis(index, "forward", "x")
        add_axis(index, "forward", "y")
        add_axis(index, "backward", "x")
        add_axis(index, "backward", "y")
    }


    return Array.from(edges).map(x => x.split(",").map(x => parseInt(x)))
}
function getFaces(result_edges,vertex_position,get_voxel_at)
{
    var connections = new Array(vertex_position.length).fill(0).map(x => [])
    for (var i = 0; i < result_edges.length; i++) {
        connections[result_edges[i][0]].push(result_edges[i][1])
        connections[result_edges[i][1]].push(result_edges[i][0])
    }

    function is_part_of_a_voxel(x, y) {
        if (x[0] > y[0]) {
            var a = y
            var b = x
        }
        else {
            var a = x
            var b = y
        }

        if (a[0] == b[0]) {
            return false
        }
        if (a[1] == b[1]) {
            return false
        }


        if (b[1] > a[1]) {
            var min_x = a[0]
            var max_x = b[0] - 1
            var min_y = a[1]
            var max_y = b[1] - 1
        }
        else {
            var min_x = a[0]
            var max_x = b[0] - 1
            var min_y = b[1]
            var max_y = a[1] - 1
        }


        for (var x = min_x; x <= max_x; x++) {
            var complete = true
            for (var y = min_y; y <= max_y; y++) {
                if (get_voxel_at([x, y]) == undefined) {
                    complete = false
                    break
                }
            }
            if (complete) {
                return true
            }
        }

        for (var y = min_y; y <= max_y; y++) {
            var complete = true
            {
                for (var x = min_x; x <= max_x; x++)
                    if (get_voxel_at([x, y]) == undefined) {
                        complete = false
                        break
                    }
            }
            if (complete) {
                return true
            }
        }
        return false
    }

    var split_connections = new Array(connections.length).fill(0).map(x => [])
    for (var index in connections) {
        var connection = connections[index]
        if (connection.length <= 2) {
            split_connections[index] = [connection]
            continue;
        }
        var result = []
        for (var i = 0; i < connection.length; i++) {
            var x = connection[i]
            var a = vertex_position[x]
            for (var j = i + 1; j < connection.length; j++) {
                var y = connection[j]
                if (x == null || y == null) continue;
                var b = vertex_position[y]
                if (is_part_of_a_voxel(a, b)) {
                    var edge = [x, y]
                    result.push(edge)
                }

            }
        }
        split_connections[index] = result
    }


    function find_path(a, b) {
        return split_connections[a].findIndex((x) => x.includes(b))
    }

    var pools = []
    var visited = new Set()
    var global_visited = new Set()

    for (var index in split_connections) {
        for (var index2 in split_connections[index]) {
            index = Number(index)
            var pool = []
            var local_visited = new Set()
            visited.add(index)
            local_visited.add(index)
            var accepted = new Set()
            accepted.add(`${index},${index2}`)
            walk(index)
            if (pool.length == 0) continue;
            pools.push(pool)
            function walk(index) {
                for (const index2 in split_connections[index]) {
                    if (!accepted.has(`${index},${index2}`)) continue
                    if (global_visited.has(`${index},${index2}`)) continue;
                    if (local_visited.has(`${index},${index2}`)) continue;

                    accepted = new Set()

                    local_visited.add(`${index},${index2}`)
                    global_visited.add(`${index},${index2}`)

                    var connection = split_connections[index][index2]
                    accepted.add(`${connection[0]},${find_path(connection[0], index)}`)
                    accepted.add(`${connection[1]},${find_path(connection[1], index)}`)

                    pool.push(index)

                    // var decoy = connection.map((x,i)=>i)
                    // decoy = decoy.sort((a,b)=>connections[connection[b]].length - connections[connection[a]].length)
                    // for(var item of decoy)
                    // {
                    //   walk(connection[item])
                    // }
                    for (var item of connection) {
                        walk(item)
                    }
                }
            }
        }
    }
    return pools
}
function getHierarchy(pools,vertex_position)
{
    
    function pointInPolygon(poly, point) {

        var inside = false;
        var x = point[0], y = point[1];
        var vs = poly.map(function (p) { return p[0]; });

        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i], yi = poly[i][1];
            var xj = vs[j], yj = poly[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

            if (intersect) inside = !inside;

            if ((yi === y && xi === x) || (yj === y && xj === x)) {
                inside = true;
                break;
            }
        }

        return inside;
    }


    var sub_pool_group = Array.from(pools).fill(0).map(x => [])

    for (var i = 0; i < pools.length; i++) {
        var poly = pools[i].map(x => vertex_position[x])
        for (var j = 0; j < pools.length; j++) {
            if (i == j) continue;

            if (pools[j].every(x => pointInPolygon(poly, vertex_position[x]))) {
                sub_pool_group[i].push(j)
            }
            else {
            }
        }
    }


    var is_sub_pool = new Array(pools.length).fill(false)
    var sub_pool_parent = new Array(pools.length).fill(0).map(x => [])

    for (var i = 0; i < sub_pool_group.length; i++) {
        for (var j = 0; j < sub_pool_group[i].length; j++) {
            sub_pool_parent[sub_pool_group[i][j]].push(i)
        }
    }

    for (var i = 0; i < sub_pool_parent.length; i++) {
        for (var j = 0; j < sub_pool_parent[i].length; j++) {
            sub_pool_group[sub_pool_parent[i][j]] = sub_pool_group[sub_pool_parent[i][j]].filter(x => !sub_pool_group[i].includes(x))
        }
    }

    var decoy = new Array(pools.length).fill(0).map((x, i) => i)

    decoy.sort((a, b) => sub_pool_group[a].includes(b) ? -1 : 1)

    var visited = new Set()
    for (const item of decoy) {
        if (!visited.has(item)) {
            walk(item)
        }
    }

    function walk(index, depth = 0) {
        if (visited.has(index)) return;
        visited.add(index)

        for (const item of sub_pool_group[index]) {
            walk(item, depth + 1)
        }

        if (depth % 2 == 1) {
            sub_pool_group[index] = []
            is_sub_pool[index] = true
        }
    }
    return [sub_pool_group, is_sub_pool]
}
function get_geometry(pools, vertex_position, sub_pool_group, is_sub_pool) {
    var result = []
    for (var item in pools) {
        if (is_sub_pool[item]) continue;
        var id = 0
        var positions = []
        for (var index of pools[item]) {
            positions.push(...vertex_position[index])
            id += 1
        }
        var holes = []
        for (var index of sub_pool_group[item]) {
            var poligon = []
            holes.push(id)
            for (var ii of pools[index]) {
                poligon.push(...vertex_position[ii])
                id += 1
            }
            positions.push(...poligon)
        }
        var indices = earcut(positions, holes)
        result.push({positions, indices})
    }
    return result
}
