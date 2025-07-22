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
import { SimilarPets } from '#src/components/organisms';
import {
  type ICatDetails,
  type IDogDetails,
  type IFarmAnimalsDetails,
  type IHorseDetails,
  resolveApiErrorMessage,
  //   type IPet,
  useGetPetByCodeWithSpeciesDetailsAndSimilarPetsQuery,
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
  const {
    data: pet,
    isLoading,
    isError,
    error,
  } = useGetPetByCodeWithSpeciesDetailsAndSimilarPetsQuery(lk_pet_code ?? '');

  const imageUrl = pet?.photos[0];

  function renderSpeciesPanel() {
    switch (pet?.main.specie.toLowerCase()) {
      case 'cat':
        return pet.main.catDetails ? <CatDetailsPanel details={pet.main.catDetails} /> : null;
      case 'dog':
        return pet.main.dogDetails ? <DogDetailsPanel details={pet.main.dogDetails} /> : null;
      case 'horse':
        return pet.main.horseDetails ? <HorseDetailsPanel details={pet.main.horseDetails} /> : null;
      case 'farm-animal':
        return pet.main.farmAnimalDetails ? (
          <FarmAnimalDetailsPanel details={pet.main.farmAnimalDetails} />
        ) : null;
      default:
        return null;
    }
  }

  if (isLoading) return <p>Loading pet</p>;
  if (isError) return <p>Error: {resolveApiErrorMessage(error)}</p>;

  return (
    <div className='max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen'>
      {/* Left col - pet imgs */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
        <div>
          <img
            src={imageUrl}
            alt={pet?.main.name}
            className='w-full rounded-lg shadow-lg object-cover aspect-square'
          />
        </div>

        {/* Right col - key characteristics */}
        <div className='space-y-6'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>{pet?.main.name}</h1>
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
              <p className='text-gray-700 text-lg'>{pet?.main.specie}</p>
            </div>

            {pet?.main.breed && (
              <div>
                <label className='text-gray-600 font-medium'>Breed</label>
                <p className='text-gray-700 text-lg'>{pet.main.breed}</p>
              </div>
            )}

            {pet?.main.age_int && (
              <div>
                <label className='text-gray-600 font-medium'>Age</label>
                <p className='text-gray-700 text-lg'>{pet.main.age_int}</p>
              </div>
            )}

            <div>
              <label className='text-gray-600 font-medium'>Sex</label>
              <p className='text-gray-700 text-lg'>{pet?.main.sex_txt}</p>
            </div>

            <div>
              <label className='text-gray-600 font-medium'>Sterilized</label>
              <p className='text-gray-700'>{pet?.main.is_sterilized_flg ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Adopt Me Button */}
          <Button
            className={`bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white px-4 py-2 
                rounded-lg w-full md:w-auto`}
            isDisabled={!pet?.main.is_available}
          >
            {pet?.main.is_available ? 'Adopt Me!' : 'Not Available'}
          </Button>
        </div>
      </div>

      {/* Description block */}
      {pet?.main.description_txt && (
        <Card className='mb-6'>
          <CardHeader>
            <h2 className='text-2xl font-semibold text-gray-800'>About {pet.main.name}</h2>
          </CardHeader>
          <CardContent>
            <p className='text-gray-700 leading-relaxed'>{pet.main.description_txt}</p>
          </CardContent>
        </Card>
      )}

      {/* Health & needs panel */}
      {(pet?.main.special_needs || pet?.main.health) && (
        <Card className='mb-6'>
          <CardHeader>
            <h2 className='text-2xl font-semibold text-gray-800'>Health & Special Needs</h2>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {pet.main.health && (
                <div>
                  <label className='text-gray-600 font-medium'>Health Status</label>
                  <p className='text-gray-700'>{pet.main.health}</p>
                </div>
              )}

              {pet.main.special_needs && (
                <div>
                  <label className='text-gray-600 font-medium'>Special Needs</label>
                  <p className='text-gray-700'>{pet.main.special_needs}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Species-specific panel */}
      {renderSpeciesPanel()}

      {<SimilarPets title='You can also adopt' pets={pet?.similar} />}
    </div>
  );
}

export default PetDetails;
