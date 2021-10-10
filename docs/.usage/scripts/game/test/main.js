require('babel-register') ({ presets: [ 'env' ] })
const Element = require('../core/element/element').default
const Stage = require('../core/canvas/stage').default
const {Scene, scenes} = require('../core/scene')
const Layer = require('../core/layer').default
const Group = require('../core/group').default
const Rect = require('../core/rect').default
const Circle = require('../core/circle').default
//const Game = require('../core/game').default

const BinaryTree = require('../core/structure/binary-tree').default

module.exports = {
    Element,
    Stage,
    Scene, scenes,
    Layer, Group, Rect, Circle,
    //Game
    // 数据结构
    BinaryTree
}