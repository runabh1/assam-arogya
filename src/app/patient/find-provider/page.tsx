
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Stethoscope, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

// Center of Assam
const defaultCenter = {
  lat: 26.2006,
  lng: 92.9376
};

const mapLibraries: ('places')[] = ['places'];

export default function FindProviderPage() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: mapLibraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('Veterinary near Guwahati');
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const handleSearch = () => {
    if (!map) return;

    setLoading(true);
    setPlaces([]);
    setSelectedPlace(null);

    const placesService = new google.maps.places.PlacesService(map);
    const request: google.maps.places.TextSearchRequest = {
      query: searchQuery,
      location: map.getCenter(),
      radius: 50000, // 50km
    };

    placesService.textSearch(request, (results, status) => {
      setLoading(false);
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setPlaces(results);
        if (results.length > 0 && results[0].geometry?.location) {
          map.panTo(results[0].geometry.location);
          map.setZoom(12);
        }
        toast({ title: `${results.length} places found.`})
      } else {
        toast({ variant: 'destructive', title: 'Search failed', description: 'Could not find places. The Places API might not be enabled for your key.'})
      }
    });
  };

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  
  const cardRef = useRef<HTMLDivElement>(null);


  if (loadError) return <div className="text-red-500 font-bold">Error loading maps. Please ensure your API key is valid and has both "Maps JavaScript API" and "Places API" enabled.</div>;

  return (
    <main className="grid flex-1 gap-4 md:gap-8 grid-cols-1 lg:grid-cols-3 h-[calc(100vh-8rem)]">
      <Card className="lg:col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle>Find a Provider</CardTitle>
          <CardDescription>Search for vets and clinics near you.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Vets near Guwahati"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={loading || !isLoaded}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-grow overflow-y-auto space-y-4 pr-2">
            {loading && <p>Searching...</p>}
            {!loading && places.length === 0 && (
                <div className="text-center text-muted-foreground pt-10">
                    <p>No results to display. Try a search like "Vets near Guwahati".</p>
                </div>
            )}
            {places.map((place, index) => (
              <Card 
                key={place.place_id || index} 
                className={`cursor-pointer hover:shadow-md ${selectedPlace?.place_id === place.place_id ? 'border-primary' : ''}`}
                onClick={() => {
                  setSelectedPlace(place);
                  if (place.geometry?.location) {
                      map?.panTo(place.geometry.location);
                      map?.setZoom(15);
                  }
                }}
                ref={selectedPlace?.place_id === place.place_id ? cardRef : null}
              >
                <CardContent className="pt-6">
                  <p className="font-bold">{place.name}</p>
                  <p className="text-sm text-muted-foreground flex items-start gap-2 pt-1">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{place.formatted_address}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="lg:col-span-2 w-full h-full min-h-[400px]">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={8}
            onLoad={onMapLoad}
            onUnmount={onUnmount}
            options={{
                disableDefaultUI: true,
                zoomControl: true,
            }}
          >
            {places.map((place) => (
              place.geometry?.location && (
                <Marker
                  key={place.place_id}
                  position={place.geometry.location}
                  onClick={() => {
                      setSelectedPlace(place);
                      const cardElement = document.querySelector(`[data-place-id="${place.place_id}"]`);
                      cardElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                />
              )
            ))}

            {selectedPlace && selectedPlace.geometry?.location && (
              <InfoWindow
                position={selectedPlace.geometry.location}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div className="p-1 max-w-xs">
                  <h4 className="font-bold">{selectedPlace.name}</h4>
                  <p className="text-sm">{selectedPlace.formatted_address}</p>
                   {selectedPlace.rating && (
                      <p className="text-sm pt-1">Rating: {selectedPlace.rating} ✨</p>
                   )}
                   <Button size="sm" variant="link" className="p-0 h-auto mt-1" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.name || "")}&query_place_id=${selectedPlace.place_id}`)}>
                        View on Google Maps
                    </Button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
            <p>Loading Map...</p>
          </div>
        )}
      </div>
    </main>
  );
}
