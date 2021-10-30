import THREE = require("three");
import { Text2D } from "./Text2D";

export class MeshText2D extends Text2D {

  public mesh: THREE.Mesh;

  protected geometry: THREE.PlaneGeometry;

  constructor(text = '', options = {}) {
    super(text, options);
  }

  raycast (): void {
    this.mesh.raycast.apply(this.mesh, arguments)
  }

  updateText(): void {
    this.cleanUp() // cleanup previous texture

    this.canvas.drawText(this._text, {
      font: this._font,
      fillStyle: this._fillStyle,
      shadowBlur: this._shadowBlur,
      shadowColor: this._shadowColor,
      shadowOffsetX: this._shadowOffsetX,
      shadowOffsetY: this._shadowOffsetY,
      lineHeight: this._lineHeight,
      align: this.align,
      backgroundColor: this._backgroundColor,
      horizontalPadding: this._horizontalPadding,
      verticalPadding: this._verticalPadding
    })

    this.texture = new THREE.Texture(this.canvas.canvas);
    this.texture.needsUpdate = true;
    this.applyAntiAlias()

    if (!this.material) {
      this.material = new THREE.MeshBasicMaterial({ map: this.texture, side: this.side });
      this.material.transparent = true

    } else {
      this.material.map = this.texture
    }

    if (!this.mesh) {
      this.geometry = new THREE.PlaneGeometry(this.canvas.width, this.canvas.height);
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.add(this.mesh)
    }

    this.mesh.position.x = ((this.canvas.width/2) - (this.canvas.textWidth/2)) + ((this.canvas.textWidth/2) * this.align.x)
    this.mesh.position.y = (- this.canvas.height/2) + ((this.canvas.textHeight/2) * this.align.y)



    // manually update geometry vertices  
    const negativeWidth = -this.canvas.width / 2;
    const positiveWidth = this.canvas.width / 2;
    const positiveHeight = this.canvas.height / 2;
    const negativeHeight = -this.canvas.height / 2;

    this.geometry.attributes.position.setXY(0, negativeWidth, positiveHeight);
    this.geometry.attributes.position.setXY(1, positiveWidth, positiveHeight);
    this.geometry.attributes.position.setXY(2, negativeWidth, negativeHeight);
    this.geometry.attributes.position.setXY(3, positiveWidth, negativeHeight);
    this.geometry.attributes.position.needsUpdate = true;
  }

}
