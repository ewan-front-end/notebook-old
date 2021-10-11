
export default class Octree {
    constructor(options = {}) {
        const {parent, origin, halfwidth, halfheight, halfdepth} = options

        this.origin = origin || []
        this.halfwidth = halfwidth;
        this.halfheight = halfheight;
        this.halfdepth = halfdepth;

        this.depth = parent === null ? 0 : parent.depth + 1;

        this.entities = new Array();	

        this.parent_node = parent;
        this.children_nodes = new Array();

        this._all_entities = new Array();	// {entity, node}, TODO : check if there is a way to make it a map entity->node
        this._to_update = parent === null ? new Array() : parent._to_update;
        this._leaves = new Array();
        this._leaves.push(this);

        this._need_leaves_update = false;
        this._need_all_entities_update = false;

        var _this = this;

        this.onEntityPoseChanged = function(entity) {
            if(_this._to_update.indexOf(entity) === -1)
                _this._to_update.push(entity);
        }

        // visual representation for debugging purposes
        var geo = new THREE.CubeGeometry( halfwidth*2, halfheight*2, halfdepth*2 );
        
        this.mesh = new THREE.Mesh( geo, new THREE.MeshBasicMaterial( { color: 0x0, opacity: 1, wireframe: true } ) );
        this.mesh.position = origin.clone();

        if(parent !== null)
        {
            this.mesh.position.sub(parent.origin);
            parent.mesh.add(this.mesh);
        }
    }
	
	//
}