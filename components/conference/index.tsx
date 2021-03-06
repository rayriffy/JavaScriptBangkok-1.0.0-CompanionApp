import React from 'react';
import { observer } from 'mobx-react-lite';
import { Schedule } from '../../interfaces/Schedule';

interface PropTypes {
  schedules: Schedule[];
  openSchedule: (shedule: Schedule) => void;
}

const ScheduleBox: React.FC<PropTypes> = observer(
  ({ schedules, openSchedule }) => {
    return (
      <div>
        {schedules?.map((e: Schedule) => {
          const disabled = !e.description;
          return (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(!disabled && {
                role: 'button',
                onKeyPress: () => openSchedule(e),
                onClick: () => openSchedule(e),
                tabIndex: 0
              })}
              key={e.key}
              className={`bg-white font-bold mx-4 ${
                e.happening ? 'border-2 border-yellow-dark' : ''
              } mt-4 p-4 rounded-lg 
                ${e.happened && !e.happening ? 'opacity-50' : 'opacity-100'} ${
                disabled ? '' : 'cursor-pointer'
              }`}
            >
              <div className='text-bg text-bkk-grey'>
                {e.hours}:{e.minutes}
              </div>
              <div className='text-yellow-font text-base'>{e.title}</div>
              {e.speaker && (
                <div className=' text-right text-sm text-bkk-grey mt-3 mr-4'>
                  By {e.speaker}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);
export default ScheduleBox;
