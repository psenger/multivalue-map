## Example Usage

```javascript
const preData = [['A',['B','B','C']]]
const mvm = new MultiValueMap(preData,{ valueType: SetCollection })
mvm.set('D', 'E')
mvm.set('D', 'E')
const value = mvm.get('A')
console.log( value ) // [ 'B', 'C' ]
for (let [key, values] of mvm.entries()) {
  console.log(key, values.getValue());
}
// A [ 'B', 'C' ]
// D [ 'E' ]
```
