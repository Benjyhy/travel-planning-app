import { render, fireEvent, act, screen } from '@testing-library/react'
import Filter from '../../components/Filter'

describe('Filter component', () => {
   const mockChangeValue = jest.fn()
   const stubbedFilterValue = {
      radius: '',
      minprice: '',
      maxprice: '',
      q: '',
   }

   test('shows all required input fields with empty values', () => {
      render(
         <Filter
            filterValue={stubbedFilterValue}
            handleChange={mockChangeValue}
         />,
      )
      expect(screen.getByText('Search a name of place')).toBeTruthy()
   })

   test('shows all required input fields with empty values', () => {
      const { getByTestId } = render(
         <Filter
            filterValue={stubbedFilterValue}
            handleChange={mockChangeValue}
         />,
      )

      expect(getByTestId('filter-radius').value).toBe('')
      expect(getByTestId('filter-minprice').value).toBe('')
      expect(getByTestId('filter-maxprice').value).toBe('')
      expect(getByTestId('search-place').value).toBe('')
   })

   test('triggers event handler on input radius', () => {
      const changedSearchValue = { ...stubbedFilterValue, radius: '120' }
      const { getByTestId, rerender } = render(
         <Filter
            filterValue={stubbedFilterValue}
            handleChange={mockChangeValue}
         />,
      )

      act(() => {
         fireEvent.change(getByTestId('filter-radius'), {
            target: { value: '120' },
         })
      })

      rerender(
         <Filter
            filterValue={changedSearchValue}
            handleChange={mockChangeValue}
         />,
      )

      expect(getByTestId('filter-radius').value).toBe('120')
      expect(mockChangeValue).toBeCalledTimes(1)
   })

   test('triggers event handler on search', () => {
      const changedSearchValue = {
         ...stubbedFilterValue,
         q: 'Brasserie La Chicorée',
      }
      const { getByTestId, rerender } = render(
         <Filter
            filterValue={stubbedFilterValue}
            handleChange={mockChangeValue}
         />,
      )

      act(() => {
         fireEvent.change(getByTestId('search-place'), {
            target: { value: 'Brasserie La Chicorée' },
         })
      })

      rerender(
         <Filter
            filterValue={changedSearchValue}
            handleChange={mockChangeValue}
         />,
      )

      expect(getByTestId('search-place').value).toBe('Brasserie La Chicorée')
      expect(mockChangeValue).toBeCalledTimes(1)
   })

   test('triggers event handler on input minprice', () => {
      const changedSearchValue = {
         ...stubbedFilterValue,
         minprice: '2',
      }
      const { getByTestId, rerender } = render(
         <Filter
            filterValue={stubbedFilterValue}
            handleChange={mockChangeValue}
         />,
      )

      act(() => {
         fireEvent.change(getByTestId('filter-minprice'), {
            target: { value: '2' },
         })
      })

      rerender(
         <Filter
            filterValue={changedSearchValue}
            handleChange={mockChangeValue}
         />,
      )

      expect(getByTestId('filter-minprice').value).toBe('2')
      expect(mockChangeValue).toBeCalledTimes(1)
   })
})
