# React JiMage

Touch enabled, pan and zoom image container for React.

- Zoom with mouseWheel or pinch
- Drag with mouse or touch
- Preloading included

See [demo](https://juji.github.io/react-jimage-example/).

## Install
```
yarn add react-jimage
```

## Usage
```js
import Image from 'react-jimage'

<div style={{ width: .., height: .., background: .. }}>
    <Image
        image={'https://image.com/yourimage.jpg'}
        preloader={<i>Loading...</i>}
    />
</div>
```

The `Image` component is a `div` with these styling:
```css
{
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  userSelect: 'none',
}
```

inside that div, we have a preloader or an `img`. The preloader is optional, and will be displayed as is. You will be the one controlling the styling for the preloader.

After the image have been loaded, we will have the image displayed inside the container.

## Props

__Functional__
| Name | Description | Optional |
|---|---|---|
| image | `String`, image src | no |
| preloader | `ReactComponent`, or `String` | yes |

__Event__
Sometimes you need to know when zoom or drag happens. The `Image` component also accepts these props:
| Name | Description |
|---|---|
| onActionStart | `Function({ type, touch })` |
| onActionEnd | `Function({ type, touch })` |
```
type: [String] 'drag' || 'zoom'
touch: [Boolean]
```

Cheers,
[jujiyangasli](http://jujiyangasli.com)
