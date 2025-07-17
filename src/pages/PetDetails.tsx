import { useParams } from 'react-router-dom';

// import { useParams } from 'react-router-dom';
import {
  // Badge,
  Button,
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  //   CardTitle,
} from '#src/components/atoms';
import {
  type ICatDetails,
  type IDogDetails,
  type IFarmAnimalsDetails,
  type IHorseDetails,
  //   type IPet,
  useAdaptiveThumbnail,
  useGetPetByCodeQuery,
} from '#src/lib';

// FIXME: separate panels
// Cat Details Panel Component
function CatDetailsPanel({ details }: { details: ICatDetails }) {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <h3 className='text-2xl font-semibold text-gray-800'>Cat-Specific Details</h3>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='text-gray-600 font-medium'>Indoor/Outdoor</label>
            <p className='text-gray-700'>{details.is_indoor_only}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Litter Trained</label>
            <p className='text-gray-700'>{details.is_litter_trained ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Good with Kids</label>
            <p className='text-gray-700'>{details.good_with_children ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Good with Dogs</label>
            <p className='text-gray-700'>{details.good_with_dogs ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Good with other Cats</label>
            <p className='text-gray-700'>{details.good_with_other_cats ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Declawed</label>
            <p className='text-gray-700'>{details.is_declawed ? 'Yes' : 'No'}</p>
          </div>
          {details.needs_special_diet && (
            <div className='md:col-span-2'>
              <label className='text-gray-600 font-medium'>Needs special diet</label>
              <p className='text-gray-700'>{details.needs_special_diet}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// FIXME: separate panels
// Dog Details Panel Component
function DogDetailsPanel({ details }: { details: IDogDetails }) {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <h3 className='text-2xl font-semibold text-gray-800'>Dog-Specific Details</h3>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* <div>
          <label className='text-gray-600 font-medium'>Size</label>
          <p className='text-gray-700'>{details.size}</p>
        </div> */}
          <div>
            <label className='text-gray-600 font-medium'>Energy Level</label>
            <p className='text-gray-700'>{details.energy_level}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Training Level</label>
            <p className='text-gray-700'>{details.training_level}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Good with Kids</label>
            <p className='text-gray-700'>{details.good_with_children ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Good with other Dogs</label>
            <p className='text-gray-700'>{details.good_with_other_dogs ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Good with Cats</label>
            <p className='text-gray-700'>{details.good_with_cats ? 'Yes' : 'No'}</p>
          </div>
          {details.exercise_needs_minutes && (
            <div className='md:col-span-2'>
              <label className='text-gray-600 font-medium'>Exercise Needs</label>
              <p className='text-gray-700'>{details.exercise_needs_minutes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// FIXME: separate panels
// Horse Details Panel Component
function HorseDetailsPanel({ details }: { details: IHorseDetails }) {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <h3 className='text-2xl font-semibold text-gray-800'>Horse-Specific Details</h3>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='text-gray-600 font-medium'>Height</label>
            <p className='text-gray-700'>{details.height_hands}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Weight</label>
            <p className='text-gray-700'>{details.weight_lbs}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Riding Level</label>
            <p className='text-gray-700'>{details.riding_level}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Discipline</label>
            <p className='text-gray-700'>{details.discipline}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Saddle trained</label>
            <p className='text-gray-700'>{details.is_saddle_trained ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Ground trained</label>
            <p className='text-gray-700'>{details.is_ground_trained ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Temperament</label>
            <p className='text-gray-700'>{details.temperament}</p>
          </div>
          {details.suitable_for_beginners && (
            <div className='md:col-span-2'>
              <label className='text-gray-600 font-medium'>Suitable for beginners</label>
              <p className='text-gray-700'>{details.suitable_for_beginners}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// FIXME: separate panels
// Farm Animal Details Panel Component
function FarmAnimalDetailsPanel({ details }: { details: IFarmAnimalsDetails }) {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <h3 className='text-2xl font-semibold text-gray-800'>Farm Animal Details</h3>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            primary_purpose
            <label className='text-gray-600 font-medium'>Primary purpose</label>
            <p className='text-gray-700'>{details.primary_purpose}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Housing requirements</label>
            <p className='text-gray-700'>{details.housing_requirements}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Pasture size needed</label>
            <p className='text-gray-700'>{details.pasture_size_needed}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Is fence trained</label>
            <p className='text-gray-700'>{details.is_fence_trained ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Requires special housing</label>
            <p className='text-gray-700'>{details.requires_special_housing ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Is good with herd</label>
            <p className='text-gray-700'>{details.good_with_herd ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Special care needs</label>
            <p className='text-gray-700'>{details.special_care_needs}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// FIXME: separate panels
// Main PetDetail Component
function PetDetails() {
  const { lk_pet_code } = useParams();
  const { data: pet, isLoading, isError, error } = useGetPetByCodeQuery(lk_pet_code ?? '');

  // FIXME: Should be details.files
  const imageUrl = useAdaptiveThumbnail(pet?.thumbnails);

  function renderSpeciesPanel() {
    switch (pet?.specie.toLowerCase()) {
      case 'cat':
        return pet.catDetails ? <CatDetailsPanel details={pet.catDetails} /> : null;
      case 'dog':
        return pet.dogDetails ? <DogDetailsPanel details={pet.dogDetails} /> : null;
      case 'horse':
        return pet.horseDetails ? <HorseDetailsPanel details={pet.horseDetails} /> : null;
      default:
        return pet?.farmAnimalDetails ? (
          <FarmAnimalDetailsPanel details={pet.farmAnimalDetails} />
        ) : null;
    }
  }

  return (
    <div className='max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen'>
      {/* Left col - pet imgs */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
        <div>
          <img
            src={imageUrl}
            alt={pet?.name}
            className='w-full rounded-lg shadow-lg object-cover h-96'
          />
        </div>

        {/* Right col - key characteristics */}
        <div className='space-y-6'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>{pet?.name}</h1>
          {/* <div>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>{pet?.name}</h1>
            <Badge
              variant={pet?.is_available ? 'default' : 'secondary'}
              className={
                pet?.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }
            >
              {pet?.is_available ? 'Available for Adoption' : 'Not Available'}
            </Badge>
          </div> */}

          <div className='space-y-3'>
            <div>
              <label className='text-gray-600 font-medium'>Specie</label>
              <p className='text-gray-700 text-lg'>{pet?.specie}</p>
            </div>

            {pet?.breed && (
              <div>
                <label className='text-gray-600 font-medium'>Breed</label>
                <p className='text-gray-700 text-lg'>{pet.breed}</p>
              </div>
            )}

            {pet?.age_int && (
              <div>
                <label className='text-gray-600 font-medium'>Age</label>
                <p className='text-gray-700 text-lg'>{pet.age_int}</p>
              </div>
            )}

            <div>
              <label className='text-gray-600 font-medium'>Sex</label>
              <p className='text-gray-700 text-lg'>{pet?.sex_txt}</p>
            </div>

            <div>
              <label className='text-gray-600 font-medium'>Sterilized</label>
              <p className='text-gray-700'>{pet?.is_sterilized_flg ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Adopt Me Button */}
          <Button
            className={`bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white px-4 py-2 
                rounded-lg w-full md:w-auto`}
            isDisabled={!pet?.is_available}
          >
            {pet?.is_available ? 'Adopt Me!' : 'Not Available'}
          </Button>
        </div>
      </div>

      {/* Description block */}
      {pet?.description_txt && (
        <Card className='mb-6'>
          <CardHeader>
            <h2 className='text-2xl font-semibold text-gray-800'>About {pet.name}</h2>
          </CardHeader>
          <CardContent>
            <p className='text-gray-700 leading-relaxed'>{pet.description_txt}</p>
          </CardContent>
        </Card>
      )}

      {/* Health & needs panel */}
      {(pet?.special_needs || pet?.health) && (
        <Card className='mb-6'>
          <CardHeader>
            <h2 className='text-2xl font-semibold text-gray-800'>Health & Special Needs</h2>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {pet.health && (
                <div>
                  <label className='text-gray-600 font-medium'>Health Status</label>
                  <p className='text-gray-700'>{pet.health}</p>
                </div>
              )}

              {pet.special_needs && (
                <div>
                  <label className='text-gray-600 font-medium'>Special Needs</label>
                  <p className='text-gray-700'>{pet.special_needs}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Species-specific panel */}
      {renderSpeciesPanel()}
    </div>
  );
}

export default PetDetails;
