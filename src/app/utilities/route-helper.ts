import { ActivatedRoute } from "@angular/router";
import { StudySetService } from "../services/study-set.service";
import { map, mergeMap } from 'rxjs/operators';

export function getStudySetFromUrl(route: ActivatedRoute, service: StudySetService) {
  return route.queryParamMap.pipe(mergeMap(params => {
    const sid = params.get("sid");
    if (sid) {
      return service.getStudySet(sid).pipe(map(sSet => sSet));
    } else {
      // we will want to make a 404 not found page
      console.log("Set does not exist so retrieved default");
      return service.getStudySet("aaaa").pipe(map(sSet => sSet));
    }
  }));
}
