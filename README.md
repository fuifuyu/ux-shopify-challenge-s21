# The Shoppies: Movie awards for entrepreneurs

The UI is created according to the mockup from the technical requirement. Improved some of the design to make it more readable, but retained the original vibe.

## Assumption made:

- If the query is less than 3 letters, the search API doesn't get call until the user finish typing (No new character in 200ms)
- The result list will show 10 items at a time
- The height of the result list will depends on the length of the list

## Extra feature/design added:

-

# Components explaination:

## Card With List

A card with a list and button beside each row.
Parameter:
| Name | Description | Type |
| -----:|-----:| -----:|-----:|-----:|
| title | The header of the card | string |
| ordered | Use a bullet or number list. | bool |
| content | The list of item that goes into the list | []<T> |
| button | Information of the button beside each row in the list | {text,onClick:(T)=>void} |
| className | Class of the card | string |
| emptyMessage | The message to show when there is no item in the list | string |
| contentFactory | A function that convert the list item into keys and label | (item:T)=>{key:string,listItem} |
| disableContent | Disable the button if the item is in this list | [] |
| disableAll | Disable all the button in the list | bool |
\*\* If contentFactory is not provided, content must be a list of string.

## Search Bar

A search bar with a search icon besides it.
| Name | Description | Type |
| -----:|-----:| -----:|-----:|-----:|
| header | The label of the input textbox | string |
| placeholder | The placeholder of the textbox. When not provided, header will be used instead. | string |
| noPlaceholder | Don't use anything as the placeholder | bool |
| onInput | Textbox onInput function | (HtmlEvent)=>void |
| inputKey | Unique id for the dom element of the input textbox. | string |

## Banner

A animated banner that slides in and exit from above. It will automatically disappear after being shown.
Usage: <Banner ref={ref}/>
ref.current.showBanner(message,success);
| Name | Description | Type |
| -----:|-----:| -----:|-----:|-----:|
| message | The message in the banner | string |
| success | Show a success (green) or warning (red) banner | bool (default:true) |
