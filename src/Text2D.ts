import THREE = require("three");

import { textAlign } from "./utils";
import { CanvasText } from "./CanvasText";

export interface TextOptions {
  font?: string;
  fillStyle?: string;
  align?: THREE.Vector2;
  side?: number;
  antialias?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  lineHeight?: number;
  backgroundColor?: string;
  horizontalPadding?: number;
  verticalPadding?: number;
}

export abstract class   Text2D extends THREE.Object3D {

  public side: number;
  public antialias: boolean;
  public texture: THREE.Texture;
  public material: THREE.MeshBasicMaterial | THREE.SpriteMaterial;

  protected _align: THREE.Vector2;
  protected _font: string;
  protected _fillStyle: string;
  protected _text: string;
  protected _shadowColor: string;
  protected _shadowBlur: number;
  protected _shadowOffsetX: number;
  protected _shadowOffsetY: number;
  protected _lineHeight: number;
  protected _backgroundColor: string;
  protected _horizontalPadding: number;
  protected _verticalPadding: number;

  protected canvas: CanvasText;

  constructor(text = '', options: TextOptions = {}) {
    
    super();

    this._align = new THREE.Vector2();
    this._font = options.font || '30px Arial';
    this._fillStyle = options.fillStyle || '#FFFFFF';

    this._shadowColor = options.shadowColor || 'rgba(0, 0, 0, 0)';
    this._shadowBlur = options.shadowBlur || 0;
    this._shadowOffsetX = options.shadowOffsetX || 0;
    this._shadowOffsetY = options.shadowOffsetY || 0;
    this._lineHeight = options.lineHeight || 1.2;

    this._backgroundColor = options.backgroundColor || 'transparent';
    this._horizontalPadding = options.horizontalPadding || 0;
    this._verticalPadding = options.verticalPadding || 0;

    this.canvas = new CanvasText()

    this.align = options.align || textAlign.center
    this.side = options.side || THREE.DoubleSide

    // this.anchor = Label.fontAlignAnchor[ this._textAlign ]
    this.antialias = (typeof options.antialias === "undefined") ? true : options.antialias
    this.text = text;
  }

  abstract raycast(): void;
  abstract updateText(): void;

  get width () { return this.canvas.textWidth }
  get height () { return this.canvas.textHeight }

  get text(): string { return this._text; }
  set text(value) {
    if (this._text !== value) {
      this._text = value;
      this.updateText();
    }
  }

  get font(): string { return this._font; }
  set font(value) {
    if (this._font !== value) {
      this._font = value;
      this.updateText();
    }
  }

  get fillStyle() {
    return this._fillStyle;
  }

  set fillStyle(value) {
    if (this._fillStyle !== value) {
      this._fillStyle = value;
      this.updateText();
    }
  }

  get align() {
    return this._align;
  }

  set align(value: THREE.Vector2) {
    this._align.copy(value);
  }

  cleanUp () {
    if (this.texture) {
      this.texture.dispose()
    }
  }

  applyAntiAlias () {
    if (this.antialias === false) {
      this.texture.magFilter = THREE.NearestFilter
      this.texture.minFilter = THREE.LinearMipMapLinearFilter
    }
  }

}
