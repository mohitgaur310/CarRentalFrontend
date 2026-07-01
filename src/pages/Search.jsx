import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiFilter, FiGrid, FiMap, FiX } from 'react-icons/fi';
import CarCard from '../components/Cards/CarCard';
import Dropdown from '../components/Forms/Dropdown';
import Input from '../components/Forms/Input';
import Button from '../components/Buttons/Button';
import Pagination from '../components/Common/Pagination';
import Breadcrumb from '../components/Common/Breadcrumb';
import { CarCardSkeleton } from '../components/Loader/Skeleton';
import { fetchCars } from '../redux/slices/carsSlice';
import { buildCarQueryParams } from '../utils/carMapper';
import {
  TRANSMISSION_TYPES,
  FUEL_TYPES,
  CAR_CATEGORIES,
  CAR_SORT_OPTIONS,
  DEFAULT_PAGE_SIZE,
} from '../constants';

const emptyFilters = {
  city: '',
  state: '',
  brand: '',
  category: '',
  transmission: '',
  fuelType: '',
  priceMin: '',
  priceMax: '',
  sort: 'popular',
};

const Search = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cars, pagination, loading, error } = useSelector((state) => state.cars);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

  const filtersFromUrl = {
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    brand: searchParams.get('brand') || '',
    category: searchParams.get('category') || '',
    transmission: searchParams.get('transmission') || '',
    fuelType: searchParams.get('fuelType') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    sort: searchParams.get('sort') || 'popular',
    isFeatured: searchParams.get('isFeatured') || '',
  };

  const [localFilters, setLocalFilters] = useState(filtersFromUrl);

  useEffect(() => {
    setLocalFilters({
      city: searchParams.get('city') || '',
      state: searchParams.get('state') || '',
      brand: searchParams.get('brand') || '',
      category: searchParams.get('category') || '',
      transmission: searchParams.get('transmission') || '',
      fuelType: searchParams.get('fuelType') || '',
      priceMin: searchParams.get('priceMin') || '',
      priceMax: searchParams.get('priceMax') || '',
      sort: searchParams.get('sort') || 'popular',
      isFeatured: searchParams.get('isFeatured') || '',
    });
    setCurrentPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  useEffect(() => {
    const params = buildCarQueryParams({
      city: searchParams.get('city') || '',
      state: searchParams.get('state') || '',
      brand: searchParams.get('brand') || '',
      category: searchParams.get('category') || '',
      transmission: searchParams.get('transmission') || '',
      fuelType: searchParams.get('fuelType') || '',
      priceMin: searchParams.get('priceMin') || '',
      priceMax: searchParams.get('priceMax') || '',
      sort: searchParams.get('sort') || 'popular',
      isFeatured: searchParams.get('isFeatured') || '',
      page: currentPage,
      limit: DEFAULT_PAGE_SIZE,
    });
    dispatch(fetchCars(params));
  }, [dispatch, searchParams, currentPage]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.delete('page');
    setSearchParams(params);
    setCurrentPage(1);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setLocalFilters(emptyFilters);
    setSearchParams({});
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams);
    if (sort && sort !== 'popular') params.set('sort', sort);
    else params.delete('sort');
    params.delete('page');
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    if (page > 1) params.set('page', String(page));
    else params.delete('page');
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FilterSidebar = () => (
    <div className="space-y-5">
      <Input label="City" placeholder="Delhi" value={localFilters.city} onChange={(e) => setLocalFilters({ ...localFilters, city: e.target.value })} />
      <Input label="State" placeholder="Karnataka" value={localFilters.state} onChange={(e) => setLocalFilters({ ...localFilters, state: e.target.value })} />
      <Input label="Brand" placeholder="e.g. BMW" value={localFilters.brand} onChange={(e) => setLocalFilters({ ...localFilters, brand: e.target.value })} />
      <Dropdown label="Category" value={localFilters.category} onChange={(v) => setLocalFilters({ ...localFilters, category: v })} options={[{ value: '', label: 'All' }, ...CAR_CATEGORIES.map((c) => ({ value: c, label: c }))]} />
      <Dropdown label="Transmission" value={localFilters.transmission} onChange={(v) => setLocalFilters({ ...localFilters, transmission: v })} options={[{ value: '', label: 'All' }, ...TRANSMISSION_TYPES.map((t) => ({ value: t, label: t }))]} />
      <Dropdown label="Fuel Type" value={localFilters.fuelType} onChange={(v) => setLocalFilters({ ...localFilters, fuelType: v })} options={[{ value: '', label: 'All' }, ...FUEL_TYPES.map((f) => ({ value: f, label: f }))]} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Min Price" type="number" placeholder="1000" value={localFilters.priceMin} onChange={(e) => setLocalFilters({ ...localFilters, priceMin: e.target.value })} />
        <Input label="Max Price" type="number" placeholder="10000" value={localFilters.priceMax} onChange={(e) => setLocalFilters({ ...localFilters, priceMax: e.target.value })} />
      </div>
      <div className="flex gap-2">
        <Button onClick={applyFilters} fullWidth>Apply</Button>
        <Button variant="outline" onClick={clearFilters}>Clear</Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Search Cars' }]} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Search Cars</h1>
          <p className="text-gray-500 mt-1">
            {pagination.total ?? cars.length} cars available
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dropdown
            value={filtersFromUrl.sort}
            onChange={handleSortChange}
            options={CAR_SORT_OPTIONS}
            className="w-48"
          />
          <div className="hidden sm:flex border rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-500'}`}><FiGrid size={18} /></button>
            <button onClick={() => setViewMode('map')} className={`p-2 ${viewMode === 'map' ? 'bg-primary-50 text-primary-600' : 'text-gray-500'}`}><FiMap size={18} /></button>
          </div>
          <Button variant="outline" leftIcon={<FiFilter size={16} />} onClick={() => setShowFilters(true)} className="lg:hidden">Filters</Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <div className="flex gap-8">
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
            <FilterSidebar />
          </div>
        </aside>

        <div className="flex-1">
          {viewMode === 'map' ? (
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FiMap size={48} className="mx-auto mb-3" />
                <p>Map view — integrate Google Maps API</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)
                  : cars.map((car) => <CarCard key={car.id} car={car} />)}
              </div>
              {!loading && cars.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-lg">No cars found matching your criteria</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">Clear Filters</Button>
                </div>
              )}
              {pagination.totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={pagination.page || currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}><FiX size={20} /></button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
