const Filter = ({
   getPlaces,
   places,
   setPlaces,
   filterValue,
   handleChange,
}) => {
   function handleClick() {
      return getPlaces()
   }

   const filterPlaceOpened = (e) => {
      if (e.target.checked) {
         const newItem = places.filter((newVal) => {
            // @ts-ignore
            return newVal?.opening_hours?.open_now === true
         })
         return setPlaces(newItem)
      }
      return getPlaces()
   }

   return (
      <div
         className="flex flex-row border-solid border-2 border-gray rounded p-4 w-full"
         data-testid="place-container"
      >
         <div>
            <label htmlFor="radius">Radius(meters)</label>
            <div>
               <input
                  type="text"
                  id="radius"
                  data-testid="filter-radius"
                  name="radius"
                  value={filterValue.radius}
                  onChange={handleChange}
                  className="rounded border-gray border-solid border-2 p-2"
                  placeholder="e.g: 900"
               />
            </div>
         </div>
         <div>
            <label className="ml-6">Min Price</label>
            <div>
               <input
                  type="text"
                  data-testid="filter-minprice"
                  name="minprice"
                  value={filterValue.minprice}
                  onInput={handleChange}
                  className="ml-6 rounded border-gray border-solid border-2 p-2"
                  placeholder="value between 0 and 4"
               />
            </div>
         </div>
         <div>
            <label className="ml-6">Max Price</label>
            <div>
               <input
                  type="text"
                  data-testid="filter-maxprice"
                  name="maxprice"
                  value={filterValue.maxprice}
                  onInput={handleChange}
                  className="ml-6 rounded border-gray border-solid border-2 p-2"
                  placeholder="value between 0 and 4"
               />
            </div>
         </div>
         <div>
            <label className="ml-6">Search a name of place</label>
            <div>
               <input
                  type="text"
                  data-testid="search-place"
                  name="q"
                  value={filterValue.q}
                  onInput={handleChange}
                  className="ml-6 rounded border-gray border-solid border-2 p-2"
                  placeholder="e.g: Le temps des cerises"
               />
            </div>
         </div>
         <div className="flex-1 mt-8">
            <input
               type="checkbox"
               id="open"
               name="opened"
               data-testid="opened-filter"
               className="ml-6 cursor-pointer"
               onChange={filterPlaceOpened}
            />
            <label htmlFor="open" className="ml-2 mt-4">
               Opened places
            </label>
         </div>
         <button
            onClick={handleClick}
            className="
                        rounded
                        bg-emerald-500
                        text-slate-50
                        font-bold
                        text-center
                        hover:bg-emerald-400
                        transition-colors
                        px-4
                     "
         >
            Rechercher
         </button>
      </div>
   )
}

export default Filter
