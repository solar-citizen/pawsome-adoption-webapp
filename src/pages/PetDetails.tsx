import { useParams } from 'react-router-dom';

import {
  Button,
  ButtonVariants,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CatDetails,
  DogDetails,
  FarmAnimalDetails,
  HorseDetails,
} from '#src/components/atoms';
import { SimilarPets } from '#src/components/organisms';
import {
  resolveApiErrorMessage,
  useAdaptiveThumbnail,
  useGetPetByCodeWithSpeciesDetailsAndSimilarPetsQuery,
} from '#src/lib';
import { Image } from '#src/components/molecules';
import { startCase } from 'lodash-es';

function PetDetails() {
  const { lk_pet_code } = useParams();
  const {
    data: pet,
    isLoading,
    isError,
    error,
  } = useGetPetByCodeWithSpeciesDetailsAndSimilarPetsQuery(lk_pet_code ?? '');

  const imageUrl = pet?.photos[0];
  const thumbnailUrl = useAdaptiveThumbnail(pet?.main?.thumbnails);

  function renderSpeciesDetails() {
    switch (pet?.main.specie.toLowerCase()) {
      case 'cat':
        return pet.main.catDetails ? <CatDetails details={pet.main.catDetails} /> : null;
      case 'dog':
        return pet.main.dogDetails ? <DogDetails details={pet.main.dogDetails} /> : null;
      case 'horse':
        return pet.main.horseDetails ? <HorseDetails details={pet.main.horseDetails} /> : null;
      case 'farm-animal':
        return pet.main.farmAnimalDetails ? (
          <FarmAnimalDetails details={pet.main.farmAnimalDetails} />
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
          <Image
            aspectRatio='aspect-square'
            src={imageUrl}
            thumbnailSrc={thumbnailUrl}
            alt={startCase(pet?.main.name)}
            className='w-full rounded-lg shadow-lg object-cover'
          />
        </div>

        {/* Right col - key characteristics */}
        <div className='space-y-6'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>{pet?.main.name}</h1>

          <div className='space-y-3'>
            <div>
              <label className='text-gray-600 font-medium'>Specie</label>
              <p className='text-gray-700 text-lg'>{startCase(pet?.main.specie)}</p>
            </div>

            {pet?.main.breed && (
              <div>
                <label className='text-gray-600 font-medium'>Breed</label>
                <p className='text-gray-700 text-lg'>{startCase(pet.main.breed)}</p>
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
              <p className='text-gray-700 text-lg'>{startCase(pet?.main.sex_txt)}</p>
            </div>

            <div>
              <label className='text-gray-600 font-medium'>Sterilized</label>
              <p className='text-gray-700'>{pet?.main.is_sterilized_flg ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Adopt Me Button */}
          <Button
            variant={
              pet?.main.is_available ? ButtonVariants.SUCCESS : ButtonVariants.DANGER_OUTLINE
            }
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
            <h2 className='text-2xl font-semibold text-gray-800'>
              About {startCase(pet.main.name)}
            </h2>
          </CardHeader>
          <CardContent>
            <CardDescription>{pet.main.description_txt}</CardDescription>
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
      {renderSpeciesDetails()}

      {<SimilarPets title='You can also adopt' pets={pet?.similar} />}
    </div>
  );
}

export default PetDetails;
