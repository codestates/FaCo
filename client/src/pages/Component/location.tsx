import { LocationList } from '../../modules/location';

type LocationProps = {
  location: LocationList;
}

function LocaList({ location }: LocationProps) {
  return (
   <option value={location.id}>
		 {location.locationKr}
   </option>
  )
}

export default LocaList;
